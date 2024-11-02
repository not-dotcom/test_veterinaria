import React, { useState, useEffect } from 'react';
import './infoPaciente.css';

function InfoPaciente({ data = {}, onDataChange }) {
    const [tipoSeleccionado, setTipoSeleccionado] = useState(data.tipoMascota || null);
    const [razaSeleccionada, setRazaSeleccionada] = useState(data.razaMascota || '');

    useEffect(() => {
        // Actualiza el estado inicial cuando el componente se monta o los datos cambian
        setTipoSeleccionado(data.tipoMascota || null);
        setRazaSeleccionada(data.razaMascota || '');
    }, [data]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (typeof onDataChange === 'function') {
            onDataChange({ ...data, [name]: value });
        }
    };

    const handleCheckboxChange = (tipo) => {
        setTipoSeleccionado(tipo);
        setRazaSeleccionada('');
        if (typeof onDataChange === 'function') {
            onDataChange({ ...data, tipoMascota: tipo, razaMascota: '' });
        }
    };

    const handleSelectChange = (e) => {
        const valorSeleccionado = e.target.value;
        setTipoSeleccionado(null);
        setRazaSeleccionada(valorSeleccionado);
        if (typeof onDataChange === 'function') {
            onDataChange({ ...data, tipoMascota: null, razaMascota: valorSeleccionado });
        }
    };


  return (
    <div className='info-paciente-container'>
      <div className='paciente'>Mascota</div>
      <div className='inputContainer' id='petName'>
        <label>Nombre</label>
        <input
          type='text'
          name='mascota'
          value={data.mascota || ''} // Conecta el valor del input al estado
          onChange={handleInputChange} // 
        />
      </div>
      <div className='inputContainer' id='petType'>
        <label>Tipo de mascota</label>
        <div className="tipoMascota">
          <input
            type="checkbox"
            className="checkperro"
            id="perro"
            name="perro"
            checked={tipoSeleccionado === 'perro'}
            onChange={() => handleCheckboxChange('perro')}
          />
          <label htmlFor="perro" className="labelP">Perro</label>

          <input
            type="checkbox"
            className="checkgato"
            id="gato"
            name="gato"
            checked={tipoSeleccionado === 'gato'}
            onChange={() => handleCheckboxChange('gato')}
          />
          <label htmlFor="gato" className="labelG">Gato</label>

          <select value={razaSeleccionada} onChange={handleSelectChange}
            style={{
              backgroundColor: razaSeleccionada ? '#1966d3' : '#fff', // Color cuando está seleccionado, 
              color: razaSeleccionada ? '#fff' : '#000', // Color de la letra cuando está seleccionado, 

            }}
          >
            <option value="" disabled="true" className='option'>Otro...</option>
            <option value="Conejo" className='option'>Conejo</option>
            <option value="Hamster" className='option'>Hámster</option>
            <option value="Cobaya" className='option'>Cobaya (Cuy)</option>
            <option value="Hurón" className='option'>Hurón</option>
            <option value="Pajaro" className='option'>Pájaro</option>
            <option value="Tortuga" className='option'>Tortuga</option>
            <option value="Pez" className='option'>Pez</option>
            <option value="Rata" className='option'>Rata</option>
            <option value="Ratón" className='option'>Ratón</option>
            <option value="Chinchilla" className='option'>Chinchilla</option>
            <option value="Erizo" className='option'>Erizo</option>
            <option value="Serpiente" className='option'>Serpiente</option>
            <option value="Lagarto" className='option'>Lagarto</option>
          </select>
        </div>

      </div>
      <div className='propietario'>Propietario</div>
      <div className='inputContainer' id='ownName'>
        <label>Nombre Completo</label>
        <input></input>
      </div>
      
      <div className='inputContainer' id='cedula'>
        <label>No. Cédula</label>
        <input></input>
      </div>

    </div>
  )
}

export default InfoPaciente;
