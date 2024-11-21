import React, { useEffect } from "react";
import "./header.css";


const Header = () => {
    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:5000/logout', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.ok) {
                window.location.href = '/iniciar-sesion'; // Redirect to login page
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <nav className="navbar navbar-light bg-light" style={{borderBottom:"1px solid #d3d3d3"}}>
            <img src={require('../../media/profile.jpg')} width="30" height="30" className="image" alt="Profile" />
            <a className="link" href="#" >
                Sistema de Agendamiento de Citas - Clínica Veterinaria UDES Bucaramanga
            </a>
            <button id="logoutBtn" onClick={handleLogout}>
                Cerrar Sesión
            </button>
        </nav>  
    );
}

export default Header;