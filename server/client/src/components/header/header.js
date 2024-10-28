import React from "react";
import "./header.css";

const Header = () => {
    return (
        <nav className="headerUser" class="navbar navbar-light bg-light" style={{borderBottom:"1px solid #d3d3d3"}}>
                    <img src={require('../../media/profile.jpg')} width="30" height="30" class="image" alt="Profile Image"></img>

        <a class="link" href="#" >
            Sistema de administración de citas - clinica Veterinaria UDES
        </a>

      </nav>  
    );
    }
    export default Header;