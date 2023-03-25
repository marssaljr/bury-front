import Cookies from "js-cookie";

const rest = (url, options) => {
    const getNewToken = async (refresh) => {
        try {
            const request = await fetch("http://localhost:8000/api/token/refresh/", {
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
}

export default rest
