
# ${1:SurveyShrike}

Survey Shrike is Used to Create the Survey Forms. Owner can view all the survey inputs by users.

## Table of Contents (Optional)

- [Installation](#installation)
- [How Survey Shrike Works ?](#How)
- [Features](#Features)
- [Technology Stack](#faq)
- [License](#license)


## Installation

### Clone

- Clone this repo to your local machine using `https://github.com/hemanth2297/SurveyShrike.git`

### Setup

#### BackEnd API

Install Python >=2.7 ( Make Sure the ports 5001 & 5002 are free)

> Start the Aunthentication API

```shell
$ python setup.py
$ pyhton Authentication.py
```
> Start the Survey Shrike API 

```shell
$ pyhton SurveyShrike.py
```

#### FrontEnd Server

Install npm and its depindencies

> Now install the project dependencies

```shell
$ npm install
```
> Now run the below script to start the User Interface

```shell
$ npm start
```


## How It Works

1. Register and Login to SurveyShrike 

2. Go to Add new Survey page to Create a new survey. Share the link of survey to other Users

3. Open the Survey from [User Survey Dashboard] to view the answers filled by each user


## Features

1. User can create survey with any number of questions .

2. Question format can be a Text,Radio,Drilldown,Slider and File Upload

3. User can view the statistics for each Question. User can distinguish the entries based on Gender.



