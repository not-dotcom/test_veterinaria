import React, { Fragment, useState, useEffect } from "react";
import './infoServicio.css';
import DatePicker from 'react-datepicker';
import { Autocomplete, TextField, Avatar } from '@mui/material';

const DoctorSelector = ({ doctors, handleDoctorChange, selectedDoctor }) => {
  return (
    <div className="fechadiv">
      <label>Medico Veterinario</label>
      <Autocomplete
      size="small"
        style={{ backgroundColor: "white", outline:"2px solid #d3d3d2", borderRadius:"2px"}}
        options={doctors}
        
        getOptionLabel={(option) => option.nombre_doctor || ""}
        onChange={(event, newValue) => handleDoctorChange(newValue)}
        renderOption={(props, option) => (
          <li {...props} key={option.id_doctor} style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar src={option.imagen_doctor} alt={option.nombre_doctor} style={{ marginRight: '10px' }} />
            <div>
              <span>{option.nombre_doctor}</span>
              <br />
              <small style={{ color: 'gray' }}>{option.especialidad}</small>
            </div>
          </li>
        )}
        renderInput={(params) => <TextField {...params} placeholder="Selecciona..." />}
        value={doctors.find(doc => doc.nombre_doctor === selectedDoctor) || null} // Aquí está el cambio
      />
    </div>
  );
};


function InfoServicio({ data = {}, onDataChange, errors }) {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [availableDays, setAvailableDays] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [startDate, setStartDate] = useState(data.fecha_cita ? new Date(data.fecha_cita) : null);
  const [hora_cita, setHora_cita] = useState(data.hora_cita || '');


  useEffect(() => {
    if (data.fecha_cita) {
      setStartDate(new Date(data.fecha_cita));
    }
  }, [data.fecha_cita]);

  useEffect(() => {
    if (data.hora_cita) {
      setHora_cita(data.hora_cita);
    }
  }, [data.hora_cita]);

  useEffect(() => {
    if (data.doctor && doctors.length > 0) {
      const doctorFound = doctors.find(doc => doc.nombre_doctor === data.doctor);
      if (doctorFound) {
        setSelectedDoctor(doctorFound);
        // Obtener disponibilidad para el doctor
        const daysAvailable = availability
          .filter(item => item.id_doctor === doctorFound.id_doctor)
          .map(item => item.dia_semana);
        setAvailableDays(daysAvailable);

        // Si hay fecha seleccionada, recuperar las horas disponibles
        if (data.fecha_cita) {
          const date = new Date(data.fecha_cita);
          const dayNumber = date.getDay();
          const available = availability.find(
            item => item.id_doctor === doctorFound.id_doctor && item.dia_semana === dayNumber
          );

          if (available) {
            const times = generateAvailableTimes(available.hora_inicio, available.hora_final);
            setAvailableTimes(times);
          }
        }
      }
    }
  }, [data.doctor, doctors, availability, data.fecha_cita]);

  useEffect(() => {
    fetch('http://localhost:5000/doctores')
      .then(response => response.json())
      .then(data => setDoctors(data))
      .catch(error => console.error('Error al obtener doctores:', error));

    fetch('http://localhost:5000/horarios')
      .then(response => response.json())
      .then(data => setAvailability(data))
      .catch(error => console.error('Error al obtener disponibilidad:', error));
  }, []);

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   if (typeof onDataChange === 'function') {
  //     onDataChange({ ...data, [name]: value });
  //   }
  // };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    if (typeof onDataChange === 'function') {
      onDataChange({ ...data, [name]: value });
    }
  };

  const handleDoctorChange = (newValue) => {
    const doctorId = newValue ? newValue.id_doctor : '';
    setSelectedDoctor(newValue);

    // Obtener los días disponibles según el doctor seleccionado
    const daysAvailable = availability
      .filter(item => item.id_doctor === doctorId)
      .map(item => item.dia_semana);

    setAvailableDays(daysAvailable);
    setStartDate(null); // Reiniciar la fecha seleccionada
    setAvailableTimes([]); // Reiniciar horas disponibles

    // Actualizar el estado en el componente padre con solo el nombre del doctor
    if (typeof onDataChange === 'function') {
      onDataChange({
        ...data,
        doctor: newValue ? newValue.nombre_doctor : ''
      });
    }
  };

  const cache = new Map();

  const isAvailableDay = (date) => {
    const dayNumber = date.getDay();

    if (cache.has(dayNumber)) {
      return cache.get(dayNumber); // Usar el valor almacenado
    }

    const result = availableDays.includes(dayNumber);
    cache.set(dayNumber, result); // Almacenar el resultado
    return result;
  };

  const handleDateChange = (date) => {
    setStartDate(date);
    const dayNumber = date.getDay();

    // Keep existing availability check logic
    const available = availability.find(
      item => item.id_doctor === selectedDoctor.id_doctor && item.dia_semana === dayNumber
    );

    if (available) {
      const startHour = available.hora_inicio;
      const endHour = available.hora_final;
      const times = generateAvailableTimes(startHour, endHour);
      setAvailableTimes(times);
    } else {
      setAvailableTimes([]);
    }

    // Add the data handling like in handleSelectChange
    if (typeof onDataChange === 'function') {
      onDataChange({
        ...data,
        fecha_cita: date
      });
    }
  };

  // Función para generar intervalos de 30 minutos entre hora_inicio y hora_final

  const generateAvailableTimes = (start, end) => {
    const times = [];
    let current = new Date();
    current.setHours(start.split(':')[0], start.split(':')[1], 0, 0);
    const endTime = new Date();
    endTime.setHours(end.split(':')[0], end.split(':')[1], 0, 0);
    while (current < endTime) {
      times.push(current.toTimeString().slice(0, 5));
      current.setMinutes(current.getMinutes() + 30); // Intervalo de 30 minutos
    }
    return times;
  };

  return (
    <div className='info-servicio-container'>
      <div className='horariosDisp'>Seleccione al doctor y horarios disponibles</div>
      <div id="doctorMain">
        <div id="doctorDiv">

          <DoctorSelector

            defaultValue="Selecciona un doctor"
            placeholder="Selecciona un doctor"
            doctors={doctors}
            handleDoctorChange={handleDoctorChange}
            selectedDoctor={data.doctor}
            handleDateChange={handleDateChange}
            startDate={startDate}
            isAvailableDay={isAvailableDay}
          />
          {errors?.doctor && <span id="classErrorDoctor" className="error-message">{errors.doctor}</span>}
        </div>



        <div id="fecha" className="fechadiv">
          <label className="fechalabel">Selecciona una fecha:</label>
          <DatePicker
            className="fechainput"
            selected={startDate}
            onChange={handleDateChange}
            filterDate={isAvailableDay}
            placeholderText="Selecciona una fecha"
            minDate={new Date()}
            disabled={!selectedDoctor}
            value={data.fecha_cita}
          />
          {errors?.fecha && <span className="error-message">{errors.fecha}</span>}
        </div>


        <div id="hora" className="horadiv">
          <label>
            Selecciona una hora:
            <br />
            <select
              className="horaInput"
              onChange={(e) => {
                setHora_cita(e.target.value);
                if (typeof onDataChange === 'function') {
                  onDataChange({
                    ...data,
                    hora_cita: e.target.value
                  });
                }
              }}
              disabled={!startDate || availableTimes.length === 0}
              value={hora_cita || data.hora_cita || ''}
            >
              {availableTimes.length > 0 ? (
                availableTimes.map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))
              ) : (
                <option value="">No hay horas disponibles</option>
              )}
            </select>
          </label>
        </div>

        {startDate && availableTimes.length === 0 && (
          <p>No hay horas disponibles para la fecha seleccionada.</p>
        )}
      </div>
      <div className='tipoClienteDiv'>Servicio y tipo de cliente</div>
      <div className='inputContainer'>
        <label>Perfil del cliente</label>
        <select
          name="tipo_cliente"
          value={data.tipo_cliente || ''}
          onChange={handleSelectChange}
        >
          <option value="" disabled="true" className='Servicio'>Seleccionar...</option>
          <option value="Externo">Externo</option>
          <option value="Estudiante">Estudiante</option>
          <option value="Profesor">Profesor</option>
          <option value="Graduado">Graduado</option>
          <option value="Administrativo">Administrativo</option>
        </select>
        {errors?.cliente && <span className="error-message">{errors.cliente}</span>}

      </div>
      <div className='inputContainer'>
        <label>Servicio</label>
        <select
        name="tipoServicio"
        value={data.tipoServicio || ''}
        onChange={handleSelectChange}
        >
          <option value="" disabled="true" className='Servicio'>Seleccionar...</option>
          <option value="Consulta" className='option'>Consulta</option>
          <option value="Cirugia" hidden="true" disabled="true" className='option'>Cirugía</option>
          <option value="Ecografia" hidden="true" disabled="true" className='option'>Ecografía</option>
          <option value="Rayos X" hidden="true" disabled="true" className='option'>Rayos X</option>
          <option value="Laboratorio Clinico" hidden="true" disabled="true" className='option'>Laboratorio Clínico</option>
          <option value="Vacunacion" hidden="true" disabled="true" className='option'>Vacunación</option>
          <option value="Profilaxis dental" hidden="true" disabled="true" className='option'>Profilaxis dental</option>
          <option value="Desparasitacion" hidden="true" disabled="true" className='option'>Desparasitación</option>
          <option value="Anestecia Inhalada" hidden="true" disabled="true" className='option'>Anestesia Inhalada</option>
        </select>
        {errors?.servicio && <span className="error-message">{errors.servicio}</span>}
      </div>



    </div>

  );
}

export default InfoServicio;