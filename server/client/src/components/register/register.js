import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import './register.css';

const Register = (props) => {
    const navigate = useNavigate();
    const handleLoginClick = () => {
        navigate('/login');
    }
    return (
        <div className='mainLogin'>
            <h1>Register</h1>
            <input type="text" placeholder="nombre" />
            <input type="text" placeholder="usuario" />
            <input type="password" placeholder="contraseña" />
            <button>Register</button>
            <button className='register' onClick={handleLoginClick}>Login</button>
        </div>
    )
}
export default Register;