import { Outlet, Navigate, useLocation } from "react-router-dom"

export default function AuthRequired() {

    const token = localStorage.getItem("token")
    const location = useLocation()
    console.log(location)

    if (!token) {
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