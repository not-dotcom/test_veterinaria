import React from "react";
import "./header.css";

const Header = () => {
    return (
        <nav class="navbar navbar-light bg-light">
                    <img src={require('../../media/profile.jpg')} width="30" height="30" class="image" alt="Profile Image"></img>

        <a class="link" href="#">
            Sistema de administración de citas - clinica Veterinaria UDES
        </a>

      </nav>  
    );
    }
    export default Header;