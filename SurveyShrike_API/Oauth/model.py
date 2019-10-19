import json
import pymongo
import urllib
from collections import Counter
import requests
import time
from flask import (Flask, make_response, render_template,
                   redirect, request, url_for)
import jwt

# Setting the access token xpiration duration
LIFE_SPAN = 180

# Signature for the access_token
ISSUER = 'SurveyShrike OAuth Server'


# Setting up the Mongo Client
CLIENT = pymongo.MongoClient("mongodb+srv://hemanth:" + urllib.quote(
    "Hemanth@123") + "@cluster0-59obx.mongodb.net/test?retryWrites=true&w=majority")
db = CLIENT.credentials

# Private key is used to encode the access token.
with open('private.pem', 'rb') as f:
    private_key = f.read()

# This method is used to check whether the credentials are correct and generate access token.


def check_credentials(request):
    username = request["username"]
    password = request["password"]

    # Checking whether the credentials are correct
    if not authenticate_user_credentials(username, password):
        return json.dumps({
            "error": "access_denied"
        }), 401

    # Generating Access token
    access_token = generate_access_token(username)
    return json.dumps({
        "access_token": access_token,
        "token_type": "JWT",
        "expires_in": LIFE_SPAN,
        'userName': username
    })

# This method is used to generate acceess token


def generate_access_token(username):
    payload = {
        "iss": ISSUER,
        "exp": time.time() + LIFE_SPAN,
        "time": time.time(),
        "userName": username
    }

    access_token = jwt.encode(payload, private_key, algorithm='RS256')

    return access_token.decode()

# This method is used to check whether the credentials are correct


def authenticate_user_credentials(username, password):

    form = db.userDetails.find_one(
        {'userName': username, 'password': password})

    if (form):
        return True

    return False
