import React from "react";
import { Link } from "react-router-dom";

export default function Register() {

    const [role, setRole] = React.useState('user')
    const [registerFormData, setRegisterFormData] = React.useState({
        name:"",
        email:"",
        password:""
    })
    const selectedRoleStyle = {
        color: 'black',
        textDecoration: 'underline'
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setRegisterFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    
    function handleSubmit(e) {
        e.preventDefault()
    }
    
    return (
        <section className="register-container">
            <p>
                <span onClick={() => setRole('customer')} style={role === 'customer' ? selectedRoleStyle : {fontWeight: '500'}}>User</span>| 
                <span onClick={() => setRole('user')} style={role === 'user' ? selectedRoleStyle : {fontWeight: '500'}}>Host</span>
            </p>
            <h1 onClick={() => console.log(registerFormData)}>Create new account</h1>
            <form onSubmit={handleSubmit} className="register-form">
                <input 
                    onChange={handleChange} 
                    name="name" type="text" 
                    placeholder="Full name">
                </input>
                <input 
                    onChange={handleChange} 
                    name="email" type="email" 
                    placeholder="Email">
                </input>
                <input 
                    onChange={handleChange} 
                    name="password" type="password" 
                    placeholder="Password">
                </input>
                <button>Register</button>
                <h4 className="login">Already have an accout? <Link to="/login">Log in here</Link></h4>
            </form>

        </section>
    )
}