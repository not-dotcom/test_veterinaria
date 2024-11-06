import React from 'react'
import './InfoContacto.css'

function InfoContacto({ data = {}, onDataChange }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (typeof onDataChange === 'function') {
      onDataChange({
        ...data,
        [name]: value
      });
    }
  };

  return (
    <div className='info-contacto-container'>
      <div className='comunicacion'>Datos para comunicarnos</div>
      <div className='inputContainer' id='correo'>
        <label>Correo Electrónico</label>
        <input
          type='email'
          name='correo'
          value={data.correo || ''}
          onChange={handleInputChange}
        />
      </div>
      <div className='inputContainer' id='noTel'>
        <label>Teléfono Celular</label>
        <input
          type='tel'
          name='telefono' 
          value={data.telefono || ''}
          onChange={handleInputChange}
        />
      </div>
      <div className='inputContainer' id='dir'>
        <label>Dirección</label>
        <input
          type='text'
          name='direccion'
          value={data.direccion || ''}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}

export default InfoContacto
