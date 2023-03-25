import {createContext, useState, useEffect} from 'react';
import Cookies from "js-cookie";
import { toast } from 'react-toastify';
import rest from '../utils/rest';


export const AuthContext = createContext();

function AuthProvider ({children}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [signed, setSigned] = useState(false);

    const parseToken = (token) => {
        return JSON.parse(atob(token.split('.')[1]));
    }

    const isTokenExpierd = (token) => {
        const decoded = parseToken(token);
        return decoded.exp < Math.floor(Date.now() / 1000);
    }
    

    useEffect(() => {
        const getUserFromCookie = () => {
            let logged = signed
            const session = Cookies.get("session");
            if (session) {
                if (isTokenExpierd(session)) {
                    Cookies.remove("session")
                    const refresh = Cookies.get("refresh");
                    if (refresh) {
                        if (isTokenExpierd(refresh)) {
                            Cookies.remove("refresh")
                        } else {
                            rest.getNewToken(refresh)                        
                        }
                    }
                    logged = false                    
                }
                logged = true                
            }
            setSigned(logged)
            return
        }
        getUserFromCookie()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const doGetToken = async (username, password) => {
        let response = {
            "detail": ""
        }
        try {
        const request = await fetch("http://localhost:8000/api/token/", {
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

    const doRegister = async (username, password) => {
        let response = {
            "detail": ""
        }
        try {
        const request = await fetch("http://localhost:8000/api/manage_user/", {
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
            console.error(error.detail? error.detail: 'Ocorreu um erro no registro')
            toast(error.detail? error.detail: 'Ocorreu um erro no registro')
        } 
    }


    const signIn = async(username, password) => {
        try {
            const token = await doGetToken(username, password)
            if (token.access && token.refresh) {
                setUser(token.access)
                Cookies.set("session", token.access, { expires: 14 })
                Cookies.set("session", token.access, { expires: 14 })
                setSigned(true)
                return true
            } else {
                setSigned(false)
                return false
            }
        } catch (error) {
            console.error(error)
            toast('Ocorreu um erro no login')
            return false
        } finally {
            setLoading(false)
        }            
    }

    const signUp = async(username, password) => {
        try {
            const register = await doRegister(username, password)
            return true            
        } catch (error) {
            console.error(error)
            toast(error)
            return false
        } finally {
            setLoading(false)
        }            
    }

    return (
        <AuthContext.Provider value={{
            signed, user, setUser, loading, signIn, signUp, message, setMessage, setSigned}}>
            {children}
        </AuthContext.Provider>
    )
   
}

export default AuthProvider