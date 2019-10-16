
const surveyTemplate = {
    'userName': "Hemanth",
    'surveyName': "test3",
    'surveyForm': {
        "0": {
            "qsn": "qsn1",
            "type": "radio",
            "options": ["a", "b"]
        },
        "1": {
            "qsn": "qsn2",
            "type": "texxt",
            "options": ["a", "c"]
        }

    }
}

// const surveyEntry = {
//     'userName': "Hemanth",
//     'surveyName': "test",
//     'entryForm': {
//         "0": "ans1",
//         "1": "ans1"
//     }
// }
const surveyUrl = "http://127.0.0.1:5002/"

export async function getAllSurvyes() {
    const access_token = localStorage.getItem('access_token')
    if (access_token) {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': access_token
            },
        };
        const response = await fetch(surveyUrl + "getAllSurveys", requestOptions);
        return handleResponse(response);
    }
}

export async function createForm(surveyObject: any) {
    const access_token = localStorage.getItem('access_token')
    if (access_token) {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': access_token
            },
            body: JSON.stringify(surveyObject)
        };
        const response = await fetch(surveyUrl + "createSurvey", requestOptions);
        return handleResponse(response);

    }
}

export async function getSurvey(surveyName: any) {
    const access_token = localStorage.getItem('access_token')
    if (access_token) {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': access_token
            },
            body: JSON.stringify({ "surveyName": surveyName })
        };
        const response = await fetch(surveyUrl + "getSurvey", requestOptions);
        console.log(response)
        return handleResponse(response);

    }
}

export async function fillForm(surveyEntry: any) {
    const access_token = localStorage.getItem('access_token')
    if (access_token) {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': access_token
            },
            body: JSON.stringify(surveyEntry)
        };
        const response = await fetch(surveyUrl + "fillSurvey", requestOptions);
        return handleResponse(response);

    }
}


function handleResponse(response: any) {
    return response.text().then((text: any) => {
        const data = text && JSON.parse(text);
        console.log(data)
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                console.log("test")
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}
