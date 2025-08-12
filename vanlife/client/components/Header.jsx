import React, { useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { PiLineVerticalBold } from "react-icons/pi";
import { BsFillXCircleFill } from "react-icons/bs";
import { message } from "react-message-popup";
import LogoutPrompt from "./LogoutPrompt";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const [logoutPromptOpen, setLogoutPromptOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate()

    const activeStyle = {
        textDecoration: 'none',
        color: 'black',
        textDecoration: 'underline'
    };

    const handleLogout = () => {
        console.log(localStorage.getItem('token'))
        if (localStorage.token) {
            localStorage.removeItem("token");
        }
    };

    const handleLogin = () => {
        localStorage.token && message.error('You are already logged in.', 2000);
    };

    return (
        <header>
            <Link className="site-logo" to="/">#VanLife</Link>
            <nav>
                <NavLink style={({ isActive }) => isActive ? activeStyle : null} to="/host">
                    Host
                </NavLink>

                <NavLink style={({ isActive }) => isActive ? activeStyle : null} to="/about">
                    About
                </NavLink>

                <NavLink style={({ isActive }) => isActive ? activeStyle : null} to="/vans">
                    Vans
                </NavLink>

                <span><PiLineVerticalBold /></span>

                <NavLink
                    className='profile-logo'
                    style={({ isActive }) => isActive ? activeStyle : null}
                    onClick={handleLogin}
                    to={localStorage.token ? null : '/login'}
                >
                    <FaRegUserCircle />
                </NavLink>

                {localStorage.token && (
                    <button className='logout-icon' onClick={() => setLogoutPromptOpen(true)}>
                        <BsFillXCircleFill />
                        <span className="log-out">Log out</span>
                    </button>
                )}
            </nav>

            {/* Prompt za logout */}
            <LogoutPrompt
                open={logoutPromptOpen}
                onClose={() => setLogoutPromptOpen(false)}
                onConfirm={() => {
                    handleLogout();
                    navigate(location.pathname.startsWith("/host") ? "/" : location.pathname)
                    setLogoutPromptOpen(false);
                }}
            />
        </header>
    );
}
