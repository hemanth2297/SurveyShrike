from flask import Flask, request
from flask_cors import CORS, cross_origin
from flask_restful import Resource, Api
from json import dumps
from flask_jsonpify import jsonify
import json
import pymongo
import urllib
from collections import Counter
import requests
from flask import (Flask, make_response, render_template,
                   redirect, request, url_for)
from model import check_credentials

# Setting up the Mongo Client
CLIENT = pymongo.MongoClient("mongodb+srv://hemanth:" + urllib.quote(
    "Hemanth@123") + "@cluster0-59obx.mongodb.net/test?retryWrites=true&w=majority")
db = CLIENT.credentials

# Creating Flask instance for Authorization API
app = Flask(__name__)
api = Api(app)
CORS(app)

# This method is used during login process
@app.route('/login', methods=['POST'])
def request_token():
    params = json.loads(str(request.data))

    # Checking whether the credentials are correct
    response = check_credentials(params)
    return response

# This method is used during Registration process
@app.route('/register', methods=['POST'])
def register_user():
    params = request.json

    # Checking if the user name slreay exists
    if(db.userDetails.find_one({'userName': params["username"]})):
        return json.dumps({
            "error": "UserName Already Exists"
        }), 401

    # Inserting the credentials into Dataase
    db.userDetails.insert_one(
        {'userName': params["username"], 'password': params["password"]})
    response = check_credentials(params)
    return response


if __name__ == '__main__':
    app.run(port=5001)
