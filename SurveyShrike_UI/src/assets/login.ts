
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
    if (user) {
        // store user details and basic auth credentials in local storage 
        // to keep user logged in between page refreshes
        // user.authdata = window.btoa(username + ':' + password);

        localStorage.setItem('userName', user["userName"]);
        localStorage.setItem('access_token', user["access_token"]);
    }
    return user;
}

export function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('userName');
    localStorage.removeItem('access_token');
}

// export async function getAll() {
//     const requestOptions = {
//         method: 'GET',
//         headers: authHeader()
//     };

//     const response = await fetch(`/users`, requestOptions);
//     return handleResponse(response);
// }

function handleResponse(response: any) {
    return response.text().then((text: any) => {
        const data = text && JSON.parse(text);
        console.log(data)
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}
