import { Outlet, Navigate, useLocation } from "react-router-dom"

export default function AuthRequired() {

    const isLoggedIn = localStorage.getItem("loggedIn")
    const location = useLocation()
    console.log(location)

    if (!isLoggedIn) {
        return <Navigate 
            to="/login" 
            state={{
                message: "You must be logged in to access Host page.",
                from: location.pathname
            }}
            replace />
    }
    return <Outlet />
}