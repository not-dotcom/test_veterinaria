import React from 'react'
import './InfoContacto.css'

function InfoContacto({ data = {}, onDataChange, errors }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'telefono') {
        // Reemplazar cualquier caracter que no sea número con string vacío
        const numericValue = value.replace(/[^0-9]/g, '');
        
        if (typeof onDataChange === 'function') {
            onDataChange({ ...data, [name]: numericValue });
        }
        return;
    }

    // Para otros campos, mantener el comportamiento original
    if (typeof onDataChange === 'function') {
        onDataChange({ ...data, [name]: value });
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
          className={errors?.correo ? 'input-error' : ''}
        />
        {errors?.correo && <span className="error-message">{errors.correo}</span>}
      </div>
      <div className='inputContainer' id='noTel'>
        <label>Teléfono Celular</label>
        <input
          type='tel'
          name='telefono' 
          value={data.telefono || ''}
          onChange={handleInputChange}
          className={errors?.telefono ? 'input-error' : ''}
        />
        {errors?.telefono && <span className="error-message">{errors.telefono}</span>}
      </div>
      <div className='inputContainer' id='dir'>
        <label>Dirección</label>
        <input
          type='text'
          name='direccion'
          value={data.direccion || ''}
          onChange={handleInputChange}
          className={errors?.direccion ? 'input-error' : ''}
        />
        {errors?.direccion && <span className="error-message">{errors.direccion}</span>}
      </div>
    </div>
  );
}

export default InfoContacto
