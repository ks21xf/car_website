from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
import boto3
import os
import io
import base64
import string
import random
from werkzeug.utils import secure_filename
import uuid

#for ids
def generate_alphanumeric(length):
    characters = string.ascii_letters + string.digits
    return ''.join(random.choices(characters, k=length))

load_dotenv()

app = Flask(__name__)
CORS(app)

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
print(collection)

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
    query = {"cid": cid}
    update = {
    "$set": { #apparently you need this $set thing for this to work
        "sold": True,
        }
    }
    collection.update_one(query,update,upsert=False) #last param adds this as a new entry to db if the cid didnt exist
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

if __name__ == "__main__":
    app.run(debug=True)