import React, { useState, useEffect } from 'react';
import './infoPaciente.css';

// Componente InfoPaciente que recibe datos y una función para manejar cambios en los datos
function InfoPaciente({ data = {}, onDataChange, errors }) {
    // Estado para el tipo de mascota seleccionado
    const [tipoSeleccionado, setTipoSeleccionado] = useState(data.tipoMascota || null);
    // Estado para la raza de la mascota seleccionada
    const [razaSeleccionada, setRazaSeleccionada] = useState(data.razaMascota || '');

    // Efecto que actualiza el estado inicial cuando el componente se monta o los datos cambian
    useEffect(() => {
        setTipoSeleccionado(data.tipoMascota || null);
        setRazaSeleccionada(data.razaMascota || '');
    }, [data]);

    // Maneja los cambios en los inputs de texto
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'cedula') {
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

    // Maneja los cambios en los checkboxes de tipo de mascota
    const handleCheckboxChange = (tipo) => {
        // Capitalize first letter for both animal types
        const formattedTipo = tipo.charAt(0).toUpperCase() + tipo.slice(1);
        
        setTipoSeleccionado(formattedTipo);
        setRazaSeleccionada('');
        if (typeof onDataChange === 'function') {
            onDataChange({ ...data, tipoMascota: formattedTipo, razaMascota: '' });
        }
    };

    // Maneja los cambios en el select de raza de mascota
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
                <label>Nombre de la mascota</label>
                <input
                    type='text'
                    name='mascota'
                    value={data.mascota || ''}
                    onChange={handleInputChange}
                    className={errors?.mascota ? 'input-error' : ''}
                />
                {errors?.mascota && <span className="error-message">{errors.mascota}</span>}

            </div>
            <div className='inputContainer' id='petType'>
                <label>Tipo de mascota</label>
                <div className="tipoMascota">
                    <input
                        type="checkbox"
                        className="checkperro"
                        id="perro"
                        name="perro"
                        checked={tipoSeleccionado === 'Perro'}
                        onChange={() => handleCheckboxChange('perro')}
                    />
                    <label htmlFor="perro" className="labelP">Perro</label>
                    {errors?.tipo && <span className="error-message-mascota">{errors.tipo}</span>}
                    <input
                        type="checkbox"
                        className="checkgato"
                        id="gato"
                        name="gato"
                        checked={tipoSeleccionado === 'Gato'} 
                        onChange={() => handleCheckboxChange('gato')}
                    />
                    <label htmlFor="gato" className="labelG">Gato</label>
                    <select value={razaSeleccionada} onChange={handleSelectChange}
                        style={{
                            backgroundColor: razaSeleccionada ? '#1966d3' : '#fff', // Color cuando está seleccionado
                            color: razaSeleccionada ? '#fff' : '#000', // Color de la letra cuando está seleccionado
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
                <input
                    type='text'
                    name='propietario'
                    value={data.propietario || ''} // Conecta el valor del input al estado
                    onChange={handleInputChange} // Maneja el cambio en el input
                    className={errors?.propietario ? 'input-error' : ''}
                ></input>
                {errors?.propietario && <span className="error-message">{errors.propietario}</span>}

            </div>
            <div className='inputContainer' id='cedula'>
                <label>No. Cédula</label>
                <input
                    type='text'
                    name='cedula'
                    value={data.cedula || ''} // Conecta el valor del input al estado
                    onChange={handleInputChange}
                    className={errors?.cedula ? 'input-error' : ''}
                />
                {errors?.cedula && <span className="error-message">{errors.cedula}</span>}

            </div>
        </div>
    );
}

export default InfoPaciente;