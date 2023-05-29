/* eslint-disable */
import Cookies from "js-cookie";
import { toast } from 'react-toastify';
const host = process.env.REACT_APP_BASE_URL;

const getUserInfo = async () => {
    try {
        const request = await fetch(host + "/api/user/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + Cookies.get("session") + ""
            }
        })
        const response = await request.json()
        return response[0]
    } catch (error) {
        console.error(error)
        return null
    }
}

const getNewToken = async (refresh) => {
    try {

        const request = await fetch(host + "/api/token/refresh/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                refresh
            })
        })
        const response = await request.json()
        if (response.access) {
            Cookies.set("session", response.access, { expires: 1 })
            Cookies.set("refresh", response.refresh, { expires: 7 })
            return response.access
        }
        return null
    } catch (error) {
        console.log(error)
        return null
    }
}


const doSignIn = async (username, password) => {
    let response = {
        "detail": ""
    }
    try {
        const request = await fetch(host + "/api/token/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        })
        response = await request.json()
        toast(response.detail)
        return response
    } catch (error) {
        console.error(error)
        toast('Ocorreu um erro no login')
    }
}

const doSignUp = async (username, email, password, first_name, last_name) => {
    let response = {
        "detail": ""
    }
    try {
        const request = await fetch(host + "/api/manage_user/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username, email, password, first_name, last_name
            })
        })
        response = await request.json()
        toast(response.detail)
        return response
    } catch (error) {
        console.error(error.detail ? error.detail : 'Ocorreu um erro no registro')
        toast(error.detail ? error.detail : 'Ocorreu um erro no registro')
    }
}

export { doSignIn, doSignUp, getNewToken, getUserInfo }
