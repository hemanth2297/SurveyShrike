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
import jwt
from flask_swagger_ui import get_swaggerui_blueprint


with open('public.pem', 'rb') as f:
    public_key = f.read()

ISSUER = 'SurveyShrike OAuth Server'
client = pymongo.MongoClient("mongodb+srv://hemanth:" + urllib.quote(
    "Hemanth@123")+"@cluster0-59obx.mongodb.net/test?retryWrites=true&w=majority")


def checkSurveyExists(surveyName):
    db = client.survey
    form = db.SurveyForms.find_one({'surveyName': surveyName})
    if(form):
        return True
    return False


def getStats(surveyEntries):
    stats = {}
    if(len(surveyEntries) > 0):

        for i in surveyEntries[0]["entryForm"].keys():
            stats[i] = {"total": {}, "Male": {}, "Female": {}}

        for entry in surveyEntries:
            gender = entry["gender"]
            for key in entry["entryForm"].keys():
                val = entry["entryForm"][key]
                stats[key]["total"][val] = 0
                stats[key][gender][val] = 0
        for entry in surveyEntries:
            gender = entry["gender"]
            for key in entry["entryForm"].keys():
                val = entry["entryForm"][key]
                stats[key]["total"][val] += 1
                stats[key][gender][val] += 1

    return stats


def verifyAccessToken(access_token):
    try:
        decoded_token = jwt.decode(access_token.encode(), public_key,
                                   issuer=ISSUER,
                                   algorithm='RS256')

    except (jwt.exceptions.InvalidTokenError,
          jwt.exceptions.InvalidSignatureError,
          jwt.exceptions.InvalidIssuerError,
          jwt.exceptions.ExpiredSignatureError):
        return False

    return True

 app = Flask(__name__)
api = Api(app)

CORS(app)

@app.route("/")
def hello():
    return jsonify({'text':'Hello World!'})


@app.route("/createSurvey",methods=['POST'])
def createSurvey(): 
    
    if not(verifyAccessToken(request.headers["Authorization"])):
        return json.dumps({
              "error": "access_denied"
            }), 401
    

    db=client.survey
    params=request.json
    if(checkSurveyExists(params["surveyName"])):
        return jsonify({'response':'SurveyName already Exists'}),400
    
    surveyDetails={}
    surveyDetails["userName"]=params["userName"]
    surveyDetails["surveyName"]=params["surveyName"]
    surveyDetails["surveyDescription"]=params["surveyDescription"]
    surveyDetails["surveyForm"]=params["surveyForm"]

    
    result=db.SurveyForms.insert_one(surveyDetails)
    return  jsonify({'response':'Survey successfully created'})

@app.route("/getSurvey",methods=['POST'])
def surveyForm():  
        
    db=client.survey
    params=request.json

    if not(checkSurveyExists(params["surveyName"])):
        return jsonify({'response':'SurveyName doesnt Exists'})
    
    result=db.SurveyForms.find_one({'surveyName': params["surveyName"]})
    del result['_id']
    return jsonify(result)

@app.route("/fillSurvey",methods=['POST'])
def surveyEntry():
    db=client.survey
    params=request.json
    if not(checkSurveyExists(params["surveyName"])):
        return jsonify({'response':'SurveyName doesnt Exist'})
    
    surveyDetails={}
    surveyDetails["userName"]=params["userName"]
    surveyDetails["surveyName"]=params["surveyName"]
    surveyDetails["entryForm"]=params["entryForm"]
    surveyDetails["gender"]=params["gender"]
    
    if(db.SurveyEntries.find_one({'surveyName': params["surveyName"],'userName':params["userName"]})):
        return  jsonify({'response':'User has already filled the survey'}),400
    
 
    db.SurveyEntries.insert_one(surveyDetails)
    return  jsonify({'response':'Survey successfully filled'})

@app.route("/getAllSurveys",methods=['GET'])
def getAllServeys():

    if not(verifyAccessToken(request.headers["Authorization"])):
        return json.dumps({
              "error": "access_denied"
            }), 401
    
    db=client.survey
    surveys=[]
    for i in db.SurveyForms.find():
        del i['_id']
        surveys.append(i)
   
    return jsonify({"results":surveys})

@app.route("/getUserSurveys",methods=['POST'])
def getUserServeys():

    if not(verifyAccessToken(request.headers["Authorization"])):
        return json.dumps({
              "error": "access_denied"
            }), 401
    
    params=request.json
    db=client.survey
    surveys=[]
    for i in db.SurveyForms.find({'userName': params["userName"]}):
        del i['_id']
        surveys.append(i)
   
    return jsonify({"results":surveys})

@app.route("/getSurveyEntries",methods=['POST'])
def getSurveyEntries():
    if not(verifyAccessToken(request.headers["Authorization"])):
        return json.dumps({
              "error": "access_denied"
            }), 401
    
    db=client.survey
    params=request.json
    if not(checkSurveyExists(params["surveyName"])):
        return jsonify({'response':'SurveyName doesnt Exists'})
       
    surveyEntries=[]
    for i in db.SurveyEntries.find({'surveyName': params["surveyName"]}):
        del i['_id']
        surveyEntries.append(i)
    
    stats=getStats(surveyEntries)
    return jsonify({"results":surveyEntries,"stats":stats})


if __name__ == '__main__':
   app.run(port=5002)

   
