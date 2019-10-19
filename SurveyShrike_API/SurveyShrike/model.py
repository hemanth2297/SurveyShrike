import pymongo
import urllib
import jwt

# public key is used to decode the access token.
with open('public.pem', 'rb') as f:
    public_key = f.read()

# Signature for the access_token
ISSUER = 'SurveyShrike OAuth Server'

# Setting up the Mongo Client
CLIENT = pymongo.MongoClient("mongodb+srv://hemanth:" + urllib.quote(
    "Hemanth@123")+"@cluster0-59obx.mongodb.net/test?retryWrites=true&w=majority")
db = CLIENT.survey

# This method is used to check if survey name exists in db.


def checkSurveyExists(surveyName):
    form = db.SurveyForms.find_one({'surveyName': surveyName})
    if(form):
        return True
    return False


# This method is used to generate the Statistics of a survey


def getStats(surveyEntries):
    stats = {}
    # Checking if there are any eentries for the survey
    if(len(surveyEntries) > 0):

        # deeclaring the variables for each qsn
        for i in surveyEntries[0]["entryForm"].keys():
            stats[i] = {"total": {}, "Male": {}, "Female": {}}

# declaring the variables for each answer
        for entry in surveyEntries:
            gender = entry["gender"]
            for key in entry["entryForm"].keys():
                val = entry["entryForm"][key]
                stats[key]["total"][val] = 0
                stats[key][gender][val] = 0

# Counting the number of times the answer repeated for each question
        for entry in surveyEntries:
            gender = entry["gender"]
            for key in entry["entryForm"].keys():
                val = entry["entryForm"][key]
                stats[key]["total"][val] += 1
                stats[key][gender][val] += 1

    return stats

# This method is used to verify the user access token


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
