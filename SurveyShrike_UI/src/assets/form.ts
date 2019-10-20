

const surveyUrl = "http://18.216.33.98:5002/"

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
        const responseJson = handleResponse(response);
        return responseJson;
    }
}


export async function getUserSurvyes() {
    const access_token = localStorage.getItem('access_token')
    const userName = localStorage.getItem('userName')
    if (access_token) {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': access_token
            },
            body: JSON.stringify({ "userName": userName })
        };
        const response = await fetch(surveyUrl + "getUserSurveys", requestOptions);
        const responseJson = handleResponse(response);
        return responseJson;
    }
}

export async function getSurveyEntries(surveyName: any) {
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
        const response = await fetch(surveyUrl + "getSurveyEntries", requestOptions);
        const responseJson = handleResponse(response);
        return responseJson;
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
        const responseJson = handleResponse(response);
        return responseJson;

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
        data.ok = response.ok
        data.status = response.status
        // if (!response.ok) {
        //     if (response.status === 401) {
        //         // auto logout if 401 response returned from api
        //         console.log("test")
        //     }
        //     const error = (data && data.message) || response.statusText;
        //     return Promise.reject(error);
        // }
        return data;
    });
}
