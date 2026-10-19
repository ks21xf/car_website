from pymongo import MongoClient
import dotenv
import os

dotenv.load_dotenv()

AWS_ACCESS_KEY=os.getenv("AWS_ACCESS_KEY")
print(AWS_ACCESS_KEY)
AWS_SECRET_ACCESS_KEY=os.getenv("AWS_SECRET_ACCESS_KEY")
AWS_REGION=os.getenv("AWS_REGION")
AWS_BUCKET_NAME=os.getenv("AWS_BUCKET_NAME")
CONNECTION_STRING = os.getenv("CONNECTION_STRING")
client = MongoClient(CONNECTION_STRING)


db = client['cars']
collection = db['car']

print(collection)

collection.insert_one({
    "cid" : "000004",
    "make": "Buick",
    "model": "Verano",
    "year": 2014,
    "price": 1000,
    "mileage": 78000,
})