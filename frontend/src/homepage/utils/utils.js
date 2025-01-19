export const API = {
    LOGIN: "login",
    REGISTER: "register",
}

export function getJWT() {
    const token = localStorage.getItem("token");
    return !!token;
}

export function requestFactory(endpoint, body) {
    const BASE_URL = "http://localhost:8080/";
    switch (endpoint) {
        case API.REGISTER: return requestRegistration(BASE_URL + endpoint, body);
        case API.LOGIN: return requestLogin(BASE_URL + endpoint, body);
        default: return alert("Unknown endpoint, please contact us if this error persists!");
    }
}

async function requestRegistration(url, body) {
    try {
        return await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    } catch (error) {
        console.log(error);
    }

}

async function requestLogin(url, body) {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    const data = await response.json();
    if(data.token) {
        localStorage.setItem("token", data.token);
        return true;
    }
    return false;
}