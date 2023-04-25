// Login.js

import React, { useState } from "react";
import axios from "axios";
//import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
//import { useLocation } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import "./login.css";

function Login() {
    //const location = useLocation()
    //console.log(location);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("Customer");
    const navigate = useNavigate();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleUserTypeChange = (event) => {
        setUserType(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        //console.log(username, password, userType)
        try {
            const response = axios.post('http://localhost:5000/login', { username, password, userType });
            console.log((await response).data.success._id);
            // <Navigate to="/home" />
            if (userType === "Customer") {
                const url = "/customer/" + (await response).data.success._id + "/home"
                navigate(url);
            }
            else if (userType === "Seller") {
                const url = "/seller/" + (await response).data.success._id + "/home"
                navigate(url);
            }
            else if (userType === "Admin") {
                const url = "/admin/" + (await response).data.success._id + "/home"
                navigate(url);
            }
            else if (userType === "Advertiser") {
                const url = "/advertiser/" + (await response).data.success._id + "/home"
                navigate(url);
            }

            // Add logic to redirect user to Home page upon successful login
        } catch (error) {
            console.error(error);
            toast.error('Invalid Credentials. Please try again.', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000, // 3 seconds
            });
        }
    };

    return (
        <div className="login-container container">
            <form onSubmit={handleSubmit} className="login-form col-md-6 col-lg-4">

                <h3 className="login-h2 mb-4">Login</h3>
                <div className="mb-3">
                    <label htmlFor="usernameInput" className="form-label">Username:</label>
                    <input type="text" className="login-input form-control" id="usernameInput" value={username} onChange={handleUsernameChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="passwordInput" className="form-label">Password:</label>
                    <input type="password" className="login-input form-control" id="passwordInput" value={password} onChange={handlePasswordChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="userTypeSelect" className="form-label">User Type:</label>
                    <select className="login-select form-select" id="userTypeSelect" value={userType} onChange={handleUserTypeChange}>
                        <option value="Customer">Customer</option>
                        <option value="Seller">Seller</option>
                        <option value="Admin">Admin</option>
                        <option value="Advertiser">Advertiser</option>
                    </select>
                </div>
                <button type="submit" className="login-button btn mb-3">Login</button>
                <p>Don't have an account? <a href="/signup">Sign up</a></p>
            </form>
        </div >
    );
}

export default Login;