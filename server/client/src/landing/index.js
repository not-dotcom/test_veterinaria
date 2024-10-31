

import React from "react";
import CatAnimation from "./catAnimation/night/catAnimation";
import DayAnimation from "./catAnimation/day/dayAnimation";
import "./landing.css";
import image from "../media/profile.jpg";
import imageFlayer from "../media/flayer.png";
import { EmblaCarousel } from "./carousel/carousel";
import Test from "../landing/motion/test.js";

const Landing = () => {
    return (
        <div className="main">

            <div className="imageDiv"><img src={image} className="image" alt="Profile Image"></img></div>

            <div className="caro"><EmblaCarousel
            ></EmblaCarousel></div>
            <div className="buttom"><button className="buttonLanding1">Iniciar sesion</button></div>
            <div className="buttom2"><a href="http://localhost:3000/user" className="buttonLanding2" >Haz una cita</a></div>
            <nav className="navbarLanding">
                <a href="">Inicio</a>
                <a href="">Sobre nosotros</a>
                <a href="http://localhost:3000/galeria">Galeria</a>
            </nav>


            <div className='column'>
                    <p className="title">Clínica Veterinaria UDES</p>
                    <p className="bodyText">En la Clínica Veterinaria de la Universidad de Santander, ofrecemos diagnósticos rápidos y precisos con tecnología avanzada. Nuestro equipo se mantiene actualizado en las mejores técnicas para garantizar la salud de cada paciente. Nos enfocamos en brindar un cuidado integral y profesional, asegurando que tu mascota reciba la atención que merece.  Nuestro equipo se mantiene actualizado en las mejores técnicas para garantizar la salud de cada paciente. Nos enfocamos en brindar un cuidado integral y profesional, asegurando que tu mascota reciba la atención que merece.</p>
                    <div className="buttom2"><a className="buttonLanding2" href="http://localhost:3000/user">Haz una cita</a></div>
            </div>


            {/* <Navbar /> */}
            {/* <CatAnimation /> */}
            {/* <DayAnimation /> */}
            {/* <header className="headerLanding">
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
                            <p className="title">Lorem ipsum</p>
                            <p className="bodyText">En la Clínica Veterinaria de la Universidad de Santander, ofrecemos diagnósticos rápidos y precisos con tecnología avanzada. Nuestro equipo se mantiene actualizado en las mejores técnicas para garantizar la salud de cada paciente. Nos enfocamos en brindar un cuidado integral y profesional, asegurando que tu mascota reciba la atención que merece.</p>
                            <button className="buttonLanding2">Haz una cita!</button>
                        </div>
                    </div>
                    <div className='column'>
                        <div className='green-column'>
                            <div className="image-container">
                                <EmblaCarousel></EmblaCarousel>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}



        </div>
    );
}

export default Landing;