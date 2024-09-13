import React, { Component } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';


const Login = (props) => {
    const navigate = useNavigate();
    const handleRegisterClick = () => {
        navigate('/register');
    }
    return (
        <div className='mainLogin'>
            <h1>Login</h1>
            <input type="text" placeholder="username" />
            <input type="password" placeholder="password" />
            <button>Login</button>
            <button className='register' onClick={handleRegisterClick}>Register</button>
        </div>
    )
}
export default Login;