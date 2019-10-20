const OAUTH_URL = "http://18.216.33.98:5001/"
export function authHeader() {
    // return authorization header with basic auth credentials
    const test = localStorage.getItem('user')
    if (test) {
        let user = JSON.parse(test);

        if (user && user.authdata) {
            return { 'Authorization': 'Basic ' + user.authdata };
        } else {
            return {};
        }
    }
}

export async function login(username: any, password: any) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };
    const url = OAUTH_URL + "login";
    const response = await fetch(url, requestOptions);
    console.log(response)
    const user = await handleResponse(response);
    // login successful if there's a user in the response

    if (response.ok) {
        localStorage.setItem('userName', user["userName"]);
        localStorage.setItem('access_token', user["access_token"]);
    }
    return user;
}

export async function logout() {
    // remove user from local storage to log user out
    const access_token = localStorage.getItem('access_token')

    if (access_token) {

        localStorage.removeItem('userName');
        localStorage.removeItem('access_token');

    }
}
export async function register(username: any, password: any) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };
    const url = OAUTH_URL + "register"
    const response = await fetch(url, requestOptions);
    console.log(response)
    const user = await handleResponse(response);
    // login successful if there's a user in the response
    if (response.ok) {
        localStorage.setItem('userName', user["userName"]);
        localStorage.setItem('access_token', user["access_token"]);
    }
    return user;
}

function handleResponse(response: any) {
    return response.text().then((text: any) => {
        const data = text && JSON.parse(text);
        // console.log(data)
        // if (!response.ok) {
        //     const error = (data && data.message) || response.statusText;
        //     return Promise.reject(error);
        // }
        return data;
    });
}
