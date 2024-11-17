import React, { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';


const Login = (props) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Error en el login');
            }
            //Login Exitoso
            navigate('/');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className='mainLogin'>
            {error && <div className='error-message'>{error}</div>}
            <div className='formDiv'>
            <form onSubmit={handleSubmit} id='form'>
                <h1 className='titleLogin'>Login</h1>
                <input 
                type="text" 
                placeholder="username" 
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                />
                <input 
                type="password" 
                placeholder="password" 
                name='password'
                value={formData.password}
                onChange={handleChange}
                required
                
                />
                <button type='submit' disabled={loading}>
                    {loading ? 'Ingresando' : 'Ingresar'}
                </button>
                <button className='register' >Register</button>
            </form>
            </div>
        </div>
    )
}
export default Login;