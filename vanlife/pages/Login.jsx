import React from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { loginUser } from "../api"

export default function Login() {
    const [loginFormData, setLoginFormData] = React.useState({ email: "", password: "" })
    const [status, setStatus] = React.useState('idle')
    const [error, setError] = React.useState(null)
    
    const navigate = useNavigate()

    const location = useLocation()

    const from = location.state?.from || '/host'

    function handleSubmit(e) {
        e.preventDefault()
        setStatus('submitting')
        loginUser(loginFormData)
            .then(data => {
                setError(null)
                localStorage.setItem('loggedIn', true)
                localStorage.setItem('userId', '123')
                navigate(from, {replace: true})
            })
            .catch(err => {
                setError(err)
            })
            .finally(() => {
                setStatus('idle')
            })
    }

    function handleChange(e) {
        const { name, value } = e.target
        setLoginFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    function handleLocation() {
        if(location.state) // location.state?.message chaning
            return <h2 className="login-state">{location.state.message}</h2>
    }

    return (
        <div className="login-container">
            {handleLocation()}
            <h1>Sign in to your account</h1>
            {
                error?.message && // if there is an error and if it has message prop
                <h3 className="login-first">{error.message}</h3>
            }
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    name="email"
                    onChange={handleChange}
                    type="email"
                    placeholder="Email address"
                    value={loginFormData.email}
                />
                <input
                    name="password"
                    onChange={handleChange}
                    type="password"
                    placeholder="Password"
                    value={loginFormData.password}
                />
                <button disabled={status === "submitting"}>
                    {status === "submitting" ? "Logging in..." : "Log in"}</button>
            </form>
        </div>
    )

}