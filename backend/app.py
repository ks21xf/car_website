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

@app.route('/api/car',methods  = ["POST"])
def upload_car():

    make = request.form.get("make")
    model = request.form.get("model")
    year = request.form.get("year")
    price = request.form.get("price")
    mileage = request.form.get("mileage")
    seats = request.form.get("seats")
    id = generate_alphanumeric(20)
    new_file_path = AWS_BASE_URL+"/"+id+"/"

    print(CLOUDFRONT_PUBLIC_URL+new_file_path)

    collection.insert_one({
        "cid" : id,
        "make": make,
        "model": model,
        "year": year,
        "price": price,
        "mileage": mileage,
        "seats": seats,
        "imgs":CLOUDFRONT_PUBLIC_URL+new_file_path,
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

    return {"Hello":"hi"}, 201

if __name__ == "__main__":
    app.run(debug=True)