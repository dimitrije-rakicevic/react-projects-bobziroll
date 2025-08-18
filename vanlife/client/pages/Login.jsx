import React from "react"
import { useNavigate, useLocation, Link } from "react-router-dom"
import { login } from "../api"

export default function Login() {
    const [loginFormData, setLoginFormData] = React.useState({ email: "", password: "" })
    const [status, setStatus] = React.useState('idle')
    const [error, setError] = React.useState(null)

    const [role, setRole] = React.useState('user')

    const selectedRoleStyle = {
        color: 'black',
        textDecoration: 'underline'
    }
    
    const navigate = useNavigate()

    const location = useLocation()

    const from = location.state?.from || '/host'

    function handleSubmit(e) {
        e.preventDefault()
        setStatus('submitting')
        login(loginFormData)
            .then(data => {
                setError(null)
                localStorage.setItem('token', data.token)
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
                <p>
                    <span onClick={() => setRole('customer')} style={role === 'customer' ? selectedRoleStyle : {fontWeight: '500'}}>User</span>| 
                     <span onClick={() => setRole('user')} style={role === 'user' ? selectedRoleStyle : {fontWeight: '500'}}>Host</span>
                </p>
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
                    {status === "submitting" ? "Logging in..." : "Log in"}
                </button>
                <h4 className="create-account">Don't have an account? <Link to="/register">Create account here</Link></h4>
            </form>
        </div>
    )

}