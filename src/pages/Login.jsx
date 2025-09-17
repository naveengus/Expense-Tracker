import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import AxiosService from '../utils/AxiosService';
import ApiRoutes from '../utils/ApiRoutes';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await AxiosService.post(ApiRoutes.LOGIN.Path, { email, password });

            // backend response
            console.log(res);

            // store token & role if backend sends it
            if (res.token) {
                sessionStorage.setItem("token", res.token);
                sessionStorage.setItem("role", res.role);
            }

            alert(res.message);
            navigate("/dashboard");
        } catch (error) {
            alert(error.message || "Internal Server Error");

        }
    }
    return (
        <div>
            <h2>Login Page</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" name='email' value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} /> <br />
                <input type="password" name='password' value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} /> <br />
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <Link to="/signup">Signup</Link></p>
        </div>
    )
}

export default Login
