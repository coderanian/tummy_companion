import {CONSTANTS} from "./constants";

export function requestFactory(endpoint, body=null, from, to) {
    switch (endpoint) {
        case CONSTANTS.API.REGISTER:
            return register(endpoint, body);
        case CONSTANTS.API.LOGIN:
            return login(endpoint, body);
        case CONSTANTS.API.DIARY:
            return fetchDiary(endpoint, from, to);
        case CONSTANTS.API.LOGOUT:
            return logout(endpoint);
        case CONSTANTS.API.NEW_DIARY_ENTRY:
            return createNewDiaryEntry(endpoint, body);
        case CONSTANTS.API.UPDATE_DIARY_ENTRY:
            return updateDiaryEntry(endpoint, body);
        case CONSTANTS.API.RESET:
            return updatePassword(endpoint, body);
        default:
            return alert("Unknown endpoint, please contact us if this error persists!");
    }
}

/**
 * @function requestRegistration
 * @description Post request to the server to register a new user.
 * @param {string} url - The URL to the server endpoint.
 * @param {Object} body - The request body containing the user data.
 * @returns {Promise<Object>} - A promise that resolves to an object with a success flag and a message.
 *                              If the registration is successful, the flag will be true and the message
 *                              will be a success message. If the registration fails, the flag will be false
 *                              and the message will contain the error message from the server.
 * @author Konstantin Kuklin konstantin.kuklin@student.htw-berlin.de
 */
async function register(url, body) {
    try {
        const response = await fetch(url, setRequestBody("POST", body));
        const data = await response.json();
        if(!response.ok) {
            return {success: false, msg: `Issue encountered: ${data.message}`};
        }
        return {success: true, msg: `Registration successful: ${data.message}`};
        //alert("Registration successful: " + data.message);
    } catch (err) {
        return {success: false, msg: "Registration failed: " + err.message};
    }
}

async function login(url, body) {
    try {
        const response = await fetch(url, setRequestBody(
            "POST",
            body));
        const data = await response.json();
        if (data.token) {
            localStorage.setItem("token", data.token);
            return {success: true, msg: "Login successful"};
        } else {
            return {success: false, msg: data.message};
        }
    } catch (err) {
        return {success: false, msg: "Login failed: " + err.message};
    }
}

async function fetchDiary(url, from, to) {
    const token = localStorage.getItem("token");
    if (token) {
        const response = await fetch(
            `${url}?from=${from}&to=${to}`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            }
        );
        const data = await response.json();
        if(response.status === 404 || response.ok) {
            return  {success: true, response: data};
        }
        return {success: false, response: data.message};
    } else {
        return {success: false, response: "Token expired, please login again!"};
    }
}

async function createNewDiaryEntry(url, body) {
    url = '/api/diary';
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(body)
        });
        const data = await response.json();
        console.log(data);
        if(response.ok) {
            return {success: true, response: null};
        } else {
            return {success: false, response: data.message};
        }
    } catch (err) {
        return {success: false, response: "Error creating new entry: " + err.message};
    }
}

async function updateDiaryEntry(url, body) {
    const updatedUrl = `/api/diary/${body._id}`;
    try {
        const response = await fetch(updatedUrl, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(body.body)
        });
        const data = await response.json();
        if(response.ok) {
            return {success: true, response: null};
        } else {
            return {success: false, response: data.message};
        }
    } catch (err) {
        return {success: false, response: "Error creating new entry: " + err.message};
    }
}

async function logout(url) {
    try {
        const response = await fetch(url, setRequestBody("POST", {}));
        localStorage.removeItem("token");
        alert("Logout successful!");
    } catch (err) {
        alert("Error logging out: " + err.message);
    }
}

async function updatePassword(url, body) {
    try {
        const response = await fetch(url, setRequestBody("POST", body));
        const data = await response.json();
        if(response.ok) {
            return {success: true, response: data.message};
        } else {
            return {success: false, response: data.message};
        }
    } catch (err) {
        return {success: false, response: "Error resetting password: " + err.message};
    }
}
function setRequestBody(method, body) {
    return {
        method: method,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    }
}
