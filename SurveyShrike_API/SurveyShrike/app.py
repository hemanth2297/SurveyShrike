from flask import Flask, request
from flask_cors import CORS, cross_origin
from flask_restful import Resource, Api
from flask_jsonpify import jsonify
import json
import pymongo
import urllib
import requests
from model import checkSurveyExists, getStats, verifyAccessToken

# Setting up the Mongo Client
CLIENT = pymongo.MongoClient("mongodb+srv://hemanth:" + urllib.quote(
    "Hemanth@123")+"@cluster0-59obx.mongodb.net/test?retryWrites=true&w=majority")
db = CLIENT.survey

# Creating Flask instance for SurveyShrike API
app = Flask(__name__)
api = Api(app)
CORS(app)

# Basic endpoint
@app.route("/")
def hello():
    return jsonify({'text': 'Hello World!'})

# This endpoint is called to Create a new Survey Form
@app.route("/createSurvey", methods=['POST'])
def createSurvey():

    # Verifying the access token of the user
    if not(verifyAccessToken(request.headers["Authorization"])):
        return json.dumps({
            "error": "access_denied"
        }), 401

    # Checking Whether thee Survey already exists
    params = request.json
    if(checkSurveyExists(params["surveyName"])):
        return jsonify({'response': 'SurveyName already Exists'}), 400

    # setting up the Survey object to insert to db
    surveyDetails = {}
    surveyDetails["userName"] = params["userName"]
    surveyDetails["surveyName"] = params["surveyName"]
    surveyDetails["surveyDescription"] = params["surveyDescription"]
    surveyDetails["surveyForm"] = params["surveyForm"]

    # inserting Survey Form to db
    db.SurveyForms.insert_one(surveyDetails)
    return jsonify({'response': 'Survey successfully created'})

# This endpoint is called to get the template of a Survey form
@app.route("/getSurvey", methods=['POST'])
def surveyForm():

    params = request.json

    # Checking Whether thee Survey already exists

    if not(checkSurveyExists(params["surveyName"])):
        return jsonify({'response': 'SurveyName doesnt Exists'})

    # retrieving Survey Template from d
    result = db.SurveyForms.find_one({'surveyName': params["surveyName"]})
    del result['_id']
    return jsonify(result)

# This endpoint is called to insert a Survey answers filled by a user
@app.route("/fillSurvey", methods=['POST'])
def surveyEntry():
    params = request.json

    # Checking Whether thee Survey already exists

    if not(checkSurveyExists(params["surveyName"])):
        return jsonify({'response': 'SurveyName doesnt Exist'})

    # Checking if th user has already filled the survey
    if(db.SurveyEntries.find_one({'surveyName': params["surveyName"], 'userName': params["userName"]})):
        return jsonify({'response': 'User has already filled the survey'}), 400

    # setting up the Survey object to insert to db
    surveyDetails = {}
    surveyDetails["userName"] = params["userName"]
    surveyDetails["surveyName"] = params["surveyName"]
    surveyDetails["entryForm"] = params["entryForm"]
    surveyDetails["gender"] = params["gender"]

    # Inserting the entry into the database
    db.SurveyEntries.insert_one(surveyDetails)
    return jsonify({'response': 'Survey successfully filled'})


# This endpoint is called to get all the surveys in th database
@app.route("/getAllSurveys", methods=['GET'])
def getAllServeys():
    # Verifying the access token of the user
    if not(verifyAccessToken(request.headers["Authorization"])):
        return json.dumps({
            "error": "access_denied"
        }), 401

    surveys = []
    for i in db.SurveyForms.find():
        del i['_id']
        surveys.append(i)

    return jsonify({"results": surveys})

# This endpoint is called to get all the surveys created by the user in th database
@app.route("/getUserSurveys", methods=['POST'])
def getUserServeys():
    # Verifying the access token of the user

    if not(verifyAccessToken(request.headers["Authorization"])):
        return json.dumps({
            "error": "access_denied"
        }), 401
    params = request.json

    surveys = []
    for i in db.SurveyForms.find({'userName': params["userName"]}):
        del i['_id']
        surveys.append(i)

    return jsonify({"results": surveys})

# This endpoint is called to get all the entries of a survey


@app.route("/getSurveyEntries", methods=['POST'])
def getSurveyEntries():

    # Verifying the access token of the user

    if not(verifyAccessToken(request.headers["Authorization"])):
        return json.dumps({
            "error": "access_denied"
        }), 401

    # Checking if Survey exists in db
    params = request.json
    if not(checkSurveyExists(params["surveyName"])):
        return jsonify({'response': 'SurveyName doesnt Exists'})

    # Retrieving all the survey entries from db
    surveyEntries = []
    for i in db.SurveyEntries.find({'surveyName': params["surveyName"]}):
        del i['_id']
        surveyEntries.append(i)

    # To get the stats of the survey
    stats = getStats(surveyEntries)
    return jsonify({"results": surveyEntries, "stats": stats})


if __name__ == '__main__':
    app.run(port=5002)
