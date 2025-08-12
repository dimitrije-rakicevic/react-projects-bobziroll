import React from "react";
import { NavLink } from "react-router-dom";

export default function Register() {
    function handleSubmit() {
        
    }
    return (
        <section className="register-container">
            <h1>Create new account</h1>
            <form onSubmit={handleSubmit} className="register-form">
                <input type="text" placeholder="Full name"></input>
                <input type="email" placeholder="Email"></input>
                <input type="password" placeholder="Password"></input>
                <button>Register</button>
                <h4 className="login">Already have an accout? <NavLink to="/login">Log in here</NavLink></h4>
            </form>

        </section>
    )
}