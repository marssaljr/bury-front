import { createContext, useState, useEffect } from 'react';
import Cookies from "js-cookie";
import { doSignIn, doSignUp, getNewToken, getUserInfo } from '../utils/rest';


export const AuthContext = createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [signed, setSigned] = useState(false);
    const [account, setAccount] = useState(null);

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
                            getNewToken(refresh)
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


    const signIn = async (username, password) => {
        try {
            const token = await doSignIn(username, password)
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
            return false
        } finally {
            setLoading(false)
        }
    }

    const signUp = async (username, email, password, first_name, last_name) => {
        try {
            await doSignUp(username, email, password, first_name, last_name)
            return true
        } catch (error) {
            console.error(error)
            return false
        } finally {
            setLoading(false)
        }
    }

    const getUser = async () => {
        try {
            setLoading(true)
            const response = await getUserInfo()
            setUser(response.user)
            setAccount(response)
            return true
        } catch (error) {
            console.error(error)
            return false
        } finally {
            setLoading(false)
        }
    }


    return (
        <AuthContext.Provider value={{
            signed, user, setUser, getUser, loading, signIn, signUp, message, setMessage, setSigned, account
        }}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthProvider