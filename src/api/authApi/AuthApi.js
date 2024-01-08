import axios from "axios";

const AUTH_API = "http://localhost:8080/api/auth/";

export const register = async (user) => {
    let result = null;
    try {
        result = await axios.post(
            `${AUTH_API}register`,
            user,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            }
        );
    }
    catch (e) {
        console.log("Find Register API error: " + e);
    }
    return result?.data;
}

export const loginGooglee = async (user) => {
    let result = null;
    try {
        result = await axios.post(`${AUTH_API}login-google`, user, {
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json',
            },
        });
    } catch (e) {
        console.log("Find books API error: " + e);
    }
    return result?.data;
};