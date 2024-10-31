import React from 'react'
import './InfoContacto.css'

function InfoContacto() {
  return (
    <div className='info-contacto-container'>
            <div className='comunicacion'>Datos para comunicarnos</div>
      <div className='inputContainer' id='correo'>
        <label>Correo Electrónico</label>
        <input></input>
      </div>
      <div className='inputContainer' id='noTel'>
        <label>Teléfono Celular</label>
        <input></input>
      </div>
      <div className='inputContainer' id='dir'>
        <label>Dirección</label>
        <input></input>
      </div>


    </div>
  )
}

export default InfoContacto
