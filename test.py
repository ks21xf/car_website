from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

AWS_ACCESS_KEY=os.getenv("AWS_ACCESS_KEY")
AWS_SECRET_ACCESS_KEY=os.getenv("AWS_SECRET_ACCESS_KEY")
AWS_REGION=os.getenv("AWS_REGION")
AWS_BUCKET_NAME=os.getenv("AWS_BUCKET_NAME")
CONNECTION_STRING = os.getenv("CONNECTION_STRING")
client = MongoClient(CONNECTION_STRING)

db = client['cars']
collection = db['car']
print(collection)

# collection.insert_one({
#     "cid" : 3,
#     "make": "Honda",
#     "model": "Civic",
#     "year": 2019,
#     "price": 18995,
#     "mileage": 84200,
# })