import React from "react";
import "./landing.css";
import image from "../media/profile.jpg";
import { EmblaCarousel } from "./carousel/carousel";
import { FRONTEND_URL } from "../config";
import Test from "./motion/test";
const Landing = () => {
  return (
    <div className="main">
      <div className="imageDiv">
        <img src={image} className="image" alt="Profile"></img>
      </div>

      <div className="caro">
        {/* <EmblaCarousel></EmblaCarousel> */}
        <Test></Test>
      </div>
      <div className="buttom">
        <a className="buttonLanding1" href="/iniciar-sesion">
        Iniciar sesión
        </a>
      </div>
      <div className="buttom2">
        <a  href={`${FRONTEND_URL}/user`} className="buttonLanding2">
          Haz una cita
        </a>
      </div>
      <nav className="navbarLanding">
        <a href="">Inicio</a>
        {/* <a href="">Sobre nosotros</a> */}
        <a href={`${FRONTEND_URL}/galeria`}>Galería</a>
      </nav>

      <div className="column">
        <p className="title">Clínica Veterinaria UDES</p>
        <p className="bodyText">
          En la Clínica Veterinaria de la Universidad de Santander, ofrecemos
          diagnósticos rápidos y precisos con tecnología avanzada. Nuestro
          equipo se mantiene actualizado en las mejores técnicas para garantizar
          la salud de cada paciente. Nos enfocamos en brindar un cuidado
          integral y profesional, asegurando que tu mascota reciba la atención
          que merece. Nuestro equipo se mantiene actualizado en las mejores
          técnicas para garantizar la salud de cada paciente. Nos enfocamos en
          brindar un cuidado integral y profesional, asegurando que tu mascota
          reciba la atención que merece.
        </p>
        <div className="buttom2">
          <a className="buttonLanding2" href={`${FRONTEND_URL}/user`}>
            Haz una cita
          </a>
        </div>
      </div>
    </div>
  );
};

export default Landing;
