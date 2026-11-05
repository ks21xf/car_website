from flask import Flask, jsonify, request
from flask_mail import Message, Mail
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
import boto3
import os
import base64
import string
import random
from werkzeug.utils import secure_filename
from decimal import Decimal, ROUND_HALF_UP #used for calculating tax and avoiding fp
from bson.decimal128 import Decimal128 #conv decimal to bson decimal128


#for ids
def generate_alphanumeric(length):
    characters = string.ascii_letters + string.digits
    return ''.join(random.choices(characters, k=length))

load_dotenv()

app = Flask(__name__)
CORS(app)

#configure app for gmail
user = os.getenv("GOOGLE_APP_USER")
print("user "+ str(user))
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587 #port for TLS
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = user
app.config['MAIL_PASSWORD'] = os.getenv("GOOGLE_APP_PSWD")

mail = Mail(app)


AWS_ACCESS_KEY=os.getenv("AWS_ACCESS_KEY")
AWS_SECRET_ACCESS_KEY=os.getenv("AWS_SECRET_ACCESS_KEY")
AWS_REGION=os.getenv("AWS_REGION")
AWS_BUCKET_NAME=os.getenv("AWS_BUCKET_NAME")
AWS_BASE_URL =os.getenv("AWS_BASE_URL")
CLOUDFRONT_PUBLIC_URL = os.getenv("CLOUDFRONT_PUBLIC_URL")

session = boto3.Session(
    aws_access_key_id=AWS_ACCESS_KEY,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    region_name= AWS_REGION
)

sts_client = session.client('s3')

CONNECTION_STRING = os.getenv("CONNECTION_STRING")
client = MongoClient(CONNECTION_STRING)

db = client['cars']
collection = db['car']
records = db['records']
expenses = db['expenses']

#define sales tax variable
hst= Decimal('0.13')

@app.route("/api/getcar",methods=["GET"])
def get_car_by_id():

    #get the cid and find the specific car with that id
    cid = request.args.get("cid")
    query = {"cid": cid}
    data = collection.find_one(query)

    #manually build the json bc its just easier
    response = {
        "id": str(data["_id"]),
        "name": data.get("cid"),
        "make": data.get("make"),
        "model": data.get("model"),
        "year": data.get("year"),
        "price": data.get("price"),
        "mileage": data.get("mileage"),
        "name": data.get("cid"),
        "fuel_type": data.get("fuel_type"),
        "imgs": data.get("imgs"),
        "num_images": data.get("num_images"),
        "seats": data.get("seats"),
        "transmission": data.get("transmission"),
        "unique_features": data.get("unique_features"),
        "standard_features": data.get("standard_features"),
        "sold" : data.get("sold"),
    }

    return jsonify(response)


@app.route("/api/cars",methods=["GET"])
def get_cars():
    data = list(collection.find({}, {"_id": 0}))
    return jsonify(data)

@app.route("/api/imgs",methods =["GET"])
def get_imgs():
    response = sts_client.get_object(Bucket=AWS_BUCKET_NAME, Key='imgs/1_1.png')

    image_bytes = response['Body'].read()
    #return send_file(io.BytesIO(image_bytes), mimetype='image/jpeg') #returns as file, not needed for react

    b64_string = base64.b64encode(image_bytes).decode('utf-8')

    # Return it wrapped cleanly in a JSON object
    return jsonify({
        "image": b64_string,
        "title": "My Image"
    })

@app.route('/api/markcarassold',methods =["POST"])
def mark_car_as_sold():
    cid = request.form.get("cid")
    licensing = request.form.get("licensing")
    buyer_info = request.form.get("buyer_info")
    date = request.form.get("date")
    print(licensing,buyer_info,date)
    query = {"cid": cid}

    data = collection.find_one(query)
    print(data)
    if data is None:
        return {"Message": "Request failed because no car with this ID was found. Verify the ID was entered correctly."}
    if data['sold'] == True:
        return  {"Message": "This car is already marked as sold."}

    update = {
    "$set": { #apparently you need this $set thing for this to work
        "sold": True,
        }
    }
    collection.update_one(query,update,upsert=False) #last param adds this as a new entry to db if the cid didnt exist

    #calculate tax - using industry standard financial libraries
    price = Decimal(str(data['price']))
    tax = price * hst
    tax = tax.quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)
    tax_str = f"{float(tax):.2f}"
    records_update = {
        "$set" : {
            "licensing": licensing,
            "sold_to": buyer_info,
            "sold_date": date,
            "hst":  tax_str
        }
    }
    records.update_one(query,records_update,upsert=False) #last param adds this as a new entry to db if the cid didnt exist

    return {"Message": "Successfully marked as sold."},201


@app.route('/api/deletecar',methods =["POST"])
def delete_car():
    cid = request.form.get("cid")
    print(cid)

    #delete car data on db side - query the correct car with its id and delet
    query = {"cid": cid}
    collection.delete_one(query)

    #delete car images on s4 side - delete the folder
    response = sts_client.list_objects_v2(Bucket=AWS_BUCKET_NAME, Prefix=f"{AWS_BASE_URL}/{cid}/")
    if 'Contents' in response: #if there's actually anything to delete

        # Build the list of file keys to delete
        delete_keys = [{'Key': obj['Key']} for obj in response['Contents']]
        sts_client.delete_objects(Bucket=AWS_BUCKET_NAME,Delete={'Objects': delete_keys})
        return {"Message":"Successful deletion."}, 201
    return {"Message": "Unable to delete - ID does not exist. Verify the ID is correct. "}, 201

@app.route('/api/car',methods  = ["POST"])
def upload_car():

    make = request.form.get("make")
    model = request.form.get("model")
    year = request.form.get("year")
    price = request.form.get("price")
    mileage = request.form.get("mileage")
    seats = request.form.get("seats")
    transmission = request.form.get("transmission")
    fuel_type = request.form.get("fuel_type")
    id = generate_alphanumeric(20)
    num_images = request.form.get("num_images")
    unique_features = request.form.get("unique_features")
    standard_features = request.form.get("standard_features")
    new_file_path = AWS_BASE_URL+"/"+id+"/"

    if make == None or model == None or year == None or price == None or mileage == None or seats == None or transmission == None or fuel_type == None or id == None or num_images == 0 or unique_features == '' or standard_features == '':
        return {"Message":"Upload failed. At least one of the fields were not filled in. Ensure all fields are filled, at least one photo of the car is provided, and at least one standard feature and one unique feature is checked."}, 201



    collection.insert_one({
        "cid" : id,
        "make": make,
        "model": model,
        "year": year,
        "price": price,
        "mileage": mileage,
        "seats": seats,
        "imgs":CLOUDFRONT_PUBLIC_URL+new_file_path,
        "transmission": transmission,
        "fuel_type": fuel_type,
        "num_images" : num_images,
        "unique_features": unique_features,
        "standard_features": standard_features,
        "sold": False
    })

    records.insert_one({
        "cid" : id,
        "make": make,
        "model": model,
        "year": year,
        "mileage": mileage,
        "buy_price": "",
        "sale_price": price,
        "hst": "",
        "licensing": "",
        "sold_to": "",
        "sold_date": "",
        "body_work": []
    })


    #photo upload
    num_files= int(request.form.get('num_files'))
    for i in range(num_files):
        photo = request.files.get('img'+str(i))

        #if photo exists, process it
        if photo and photo.filename:
            filename = secure_filename(photo.filename)
            s3_key = f"{new_file_path}{filename}" #if folder doesn't exist, it will create AWS_BASE_URL as a folder and put the filename in there

            # Upload the file-like object directly
            sts_client.upload_fileobj(
                photo,
                AWS_BUCKET_NAME,
                s3_key,
                ExtraArgs={
                    "ContentType": photo.mimetype
                }
            )

    return {"Message":f"Sucessful upload. Save the ID of the car: {id}"}, 201


@app.route('/api/send-email', methods = ['POST'])
def send_email():
    user_name = request.form.get("user_name")
    user_email = request.form.get("user_email")
    user_msg = request.form.get("user_msg")
    user_ph = request.form.get("user_ph")
    make = request.form.get("make")
    cid = request.form.get("id")
    model = request.form.get("model")
    year = request.form.get("year")
    msg = Message("Message from Website",
                  sender=user,
                  recipients=["koserravalle@gmail.com"])
    msg.body = f"You have received an E-mail from someone on your website regarding the {year} {make} {model} (ID: {cid}):\n"+"Personal Information:\n\n" +f"Full Name: {user_name}\n Email: {user_email}\n Phone Number: {user_ph} \n\n Message: \n"+user_msg
    mail.send(msg)
    return  {"Message":"Message sent successfully!"}, 201

#inserting a bodywork object into the bodywork array
@app.route('/api/addmodification',methods =["POST"])
def add_car_modification():
    cid = request.form.get("cid")
    expense = request.form.get("bodywork")
    date = request.form.get("date")
    cost = request.form.get("price")
    vender = request.form.get("vender")

    query = {"cid": cid}

    data = records.find_one(query)
    print("body",cid)
    if data is None:
        return {"Message": "Request failed because no car with this ID was found. Verify the ID was entered correctly."}

    #tax
    cost_decimal = Decimal(cost)
    tax = cost_decimal * hst
    tax = tax.quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)

    expenses.insert_one({
        "cid" : cid,
        "cost": Decimal128(cost_decimal),
        "hst" : Decimal128(tax),
        "cost+hst": Decimal128(cost_decimal + hst),
        "vender" : vender,
        "expense" : expense,
        "date" : date
    })

    return {"Message": "Successfully added modification"},201



if __name__ == "__main__":
    app.run(debug=True)