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
import time
import cryptography

from flask import (Flask, make_response, render_template,
                   redirect, request, url_for)
import jwt


LIFE_SPAN = 180

ISSUER = 'SurveyShrike OAuth Server'

CLIENT = pymongo.MongoClient("mongodb+srv://hemanth:" + urllib.quote(
    "Hemanth@123") + "@cluster0-59obx.mongodb.net/test?retryWrites=true&w=majority")
db = CLIENT.credentials

app = Flask(__name__)
api = Api(app)
CORS(app)


with open('private.pem', 'rb') as f:
    private_key = f.read()


def check_credentials(request):
    username = request["username"]
    password = request["password"]

    if not authenticate_user_credentials(username, password):
        return json.dumps({
            "error": "access_denied"
        }), 401

    access_token = generate_access_token(username)

    return json.dumps({
        "access_token": access_token,
        "token_type": "JWT",
        "expires_in": LIFE_SPAN,
        'userName': username
    })


def generate_access_token(username):
    payload = {
        "iss": ISSUER,
        "exp": time.time() + LIFE_SPAN,
        "time": time.time(),
        "userName": username
    }

    access_token = jwt.encode(payload, private_key, algorithm='RS256')

    return access_token.decode()


def authenticate_user_credentials(username, password):

    form = db.userDetails.find_one(
        {'userName': username, 'password': password})

    if (form):
        return True

    return False
