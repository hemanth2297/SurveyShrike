
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

const surveyEntry = {
    'userName': "Hemanth",
    'surveyName': "test",
    'entryForm': {
        "0": "ans1",
        "1": "ans1"
    }
}

export async function getAllSurvyes() {
    const test = localStorage.getItem('user')
    if (test) {
        const user = JSON.parse(test);
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': user.access_token
            },
        };
        const url = "http://127.0.0.1:5002/getAllSurveys"
        const response = await fetch(url, requestOptions);
        return handleResponse(response);
    }
}

export async function createForm(surveyObject: any) {
    const test = localStorage.getItem('user')
    if (test) {
        const user = JSON.parse(test);
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': user.access_token
            },
            body: JSON.stringify(surveyObject)
        };
        const url = "http://127.0.0.1:5002/createSurvey"
        const response = await fetch(url, requestOptions);
        return handleResponse(response);

    }
}

export async function getForm() {
    const test = localStorage.getItem('user')
    if (test) {
        const user = JSON.parse(test);
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': user.access_token
            },
            body: JSON.stringify({ "surveyName": "tesgggt3" })
        };
        const url = "http://127.0.0.1:5002/surveyForm"
        const response = await fetch(url, requestOptions);
        return handleResponse(response);

    }
}

export async function fillForm() {
    const test = localStorage.getItem('user')
    if (test) {
        const user = JSON.parse(test);
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': user.access_token
            },
            body: JSON.stringify(surveyEntry)
        };
        const url = "http://127.0.0.1:5002/fillSurvey"
        const response = await fetch(url, requestOptions);
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
