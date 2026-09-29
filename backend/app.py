from flask import Flask, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

client = MongoClient("CONNECTION_STRING")

db = client['cars']
collection = db['car']
print(collection)

@app.route("/api/cars",methods=["GET"])
def get_cars():
    data = list(collection.find({}, {"_id": 0}))
    return jsonify(data)


if __name__ == "__main__":
    app.run(debug=True)