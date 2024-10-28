'use client';
import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import imageFlayer from "../../media/doctores/vet_1.JPG";
import './Galeria.css'
import { EmblaCarousel } from "../../landing/carousel2/carousel2";


function Galeria() {
    return (
        <div className='main2'>
            <div className='caro2'>
                <EmblaCarousel></EmblaCarousel>

            </div>
            <div style={{ padding: "20px", height:"100vh"}}>
                <h1 className='title'>Nuestros Doctores</h1>
                <p className='text2'>
                    Nuestros doctores están altamente capacitados para brindar el mejor servicio a tu mascota. Conoce a nuestro equipo de profesionales.
                </p>
                <p className='text3'>
                    Ofrecemos servicios como:
                </p>
                <div className='servicios'>
                    <ul>
                        <li className='c1' >Consulta general</li>
                        <li className='c1'>Diagnóstico por imagen</li>
                        <li className='c1'>Tratamiento dermatológico</li>
                        <li className='c1'>Vacunación</li>
                        <li className='c1'>Desparasitaciones</li>
                        <li className='c1'>Cirugía de tejidos blandos</li>
                        <li className='c2' id='u'>Atención de emergencia</li>
                        <li className='c2' id='d'>Laboratorio (análisis de sangre y orina)</li>
                        <li className='c2' id='t'>Cuidado dental</li>
                        <li className='c2' id='c'>Terapia de rehabilitación</li>
                        <li className='c2' id='ci'>Medicamentos y tratamientos</li>
                        <li className='c2' id='s'>Cuidado geriátrico</li>
                    

                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Galeria
