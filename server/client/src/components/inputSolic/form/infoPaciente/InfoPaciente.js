import React from 'react'
import './infoPaciente.css'

function InfoPaciente({  data = {}, onDataChange }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onDataChange({ ...data, [name]: value }); // Llama a onDataChange con el nuevo estado
  };

  return (
    <div className='info-paciente-container'>
      <div className='paciente'>Mascota</div>
      <div className='inputContainer' id='petName'>
        <label>Nombre</label>
        <input
          type='text'
          name='petName'
          
        />
      </div>
      <div className='inputContainer' id='petType'>
        <label>Tipo de mascota</label>
        
        <input></input>
      </div>
      <div className='propietario'>Propietario</div>
      <div className='inputContainer' id='ownName'>
        <label>Primer Nombre</label>
        <input></input>
      </div>
      <div className='inputContainer' id='ownLast'>
        <label>Primer Apellido</label>
        <input></input>
      </div>
      <div className='inputContainer' id='cedula'>
        <label>No. Cedula</label>
        <input></input>
      </div>

    </div>
  )
}

export default InfoPaciente;
