
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

export async function login(username: string, password: string) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };
    const url = "http://127.0.0.1:5001/login"
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
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': access_token
            },
        };
        const url = "http://127.0.0.1:5001/logout"
        let response = await fetch(url, requestOptions);
        console.log(response)
        response = await handleResponse(response);

        localStorage.removeItem('userName');
        localStorage.removeItem('access_token');


    }
}
export async function register(username: string, password: string) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };
    const url = "http://127.0.0.1:5001/register"
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
