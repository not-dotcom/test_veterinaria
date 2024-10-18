import React from "react";
import CatAnimation from "./catAnimation/night/catAnimation";
import DayAnimation from "./catAnimation/day/dayAnimation";
import "./landing.css";
import image from "../media/profile.jpg";
import imageFlayer from "../media/flayer.png";

const Landing = () => {
    return (
        <div className="main">
            {/* <Navbar /> */}
            {/* <CatAnimation /> */}
            {/* <DayAnimation /> */}
            <header className="headerLanding">
                <img src={image} width="108px" height="108px" className="image" alt="Profile Image"></img>
                <nav className="navbarLanding">
                    <a href="">Inicio</a>
                    <a href="">Sobre nosotros</a>
                    <a href="">Galeria</a>
                    <button className="buttonLanding1">Iniciar sesion</button>
                    <button className="buttonLanding2">Haz una cita</button>
                </nav>
            </header>
            <div className="bodyLanding">
                <div className='row'>
                    <div className='column'>
                        <div className='blue-column'>
                            <p className="title">Amor por los lomitos</p>
                            <p className="bodyText">En la Clínica Veterinaria de la Universidad de Santander, ofrecemos diagnósticos rápidos y precisos con tecnología avanzada. Nuestro equipo se mantiene actualizado en las mejores técnicas para garantizar la salud de cada paciente. Nos enfocamos en brindar un cuidado integral y profesional, asegurando que tu mascota reciba la atención que merece.</p>
                            <button className="buttonLanding2">Haz una cita!</button>
                        </div>
                    </div>
                    <div className='column'>
                        <div className='green-column'>
                            <div className="image-container">
                                <img src={imageFlayer} width="900px" height="900px" className="imageFlayer" alt="Profile Image"></img>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Landing;