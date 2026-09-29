from pymongo import MongoClient

client = MongoClient(CONNECTION_STRING)
db = client['cars']
collection = db['car']
print(collection)

collection.insert_one({
    "cid" : 3,
    "make": "Honda",
    "model": "Civic",
    "year": 2019,
    "price": 18995,
    "mileage": 84200,
})