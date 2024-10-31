import React, { Fragment, useState, useEffect } from "react";
import './infoServicio.css';
import DatePicker from 'react-datepicker';
import { Autocomplete, TextField, Avatar } from '@mui/material';

const DoctorSelector = ({ doctors, handleDoctorChange, selectedDoctor, handleDateChange, startDate, isAvailableDay }) => {
  const defaultDoctor = doctors.find(doc => doc.id_doctor === selectedDoctor?.id_doctor) || null;

  return (
    <div className="siosi">
      <label>Medico Veterinario</label>
      <Autocomplete
      style={{backgroundColor:"white"}}
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
        value={selectedDoctor}
      />
    </div>
  );
};

function InfoServicio() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [availability, setAvailability] = useState([]);
  const [availableDays, setAvailableDays] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [hora_cita, setHora_cita] = useState("");

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

    // Encontrar la disponibilidad de horas para el doctor y el día seleccionado
    const available = availability.find(
      item => item.id_doctor === selectedDoctor.id_doctor && item.dia_semana === dayNumber
    );

    if (available) {
      const startHour = available.hora_inicio;
      const endHour = available.hora_final;

      // Generar array de horas en intervalos de 30 minutos
      const times = generateAvailableTimes(startHour, endHour);
      setAvailableTimes(times);
    } else {
      setAvailableTimes([]);
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
        <div className='inputContainer' id="doctorDiv" >

          <DoctorSelector
         
            defaultValue="Selecciona un doctor"
            placeholder="Selecciona un doctor"
            doctors={doctors}
            handleDoctorChange={handleDoctorChange}
            selectedDoctor={selectedDoctor}
            handleDateChange={handleDateChange}
            startDate={startDate}
            isAvailableDay={isAvailableDay}
          />
        </div>


        {selectedDoctor && (
          <div id="fecha" className="fechadiv">
            <label className="fechalabel">Selecciona una fecha:</label>
            <DatePicker
              className="fechainput"
              selected={startDate}
              onChange={handleDateChange}
              filterDate={isAvailableDay} // Filtra los días disponibles
              placeholderText="Selecciona una fecha"
              minDate={new Date()} // Opcional: desactivar días anteriores a hoy
            />
          </div>
        )}

        {startDate && availableTimes.length > 0 && (
          <div id="hora" className="horadiv">
            <label>
              Selecciona una hora:
              <br></br>
              <select className="horaInput" value={hora_cita} onChange={e => setHora_cita(e.target.value)}>
                {availableTimes.map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </label>
          </div>
        )}

        {startDate && availableTimes.length === 0 && (
          <p>No hay horas disponibles para la fecha seleccionada.</p>
        )}
      </div>
      <div className='tipoClienteDiv'>Servicio y tipo de cliente</div>
      <div className='inputContainer'>
        <label>Perfil del cliente</label>
        <input></input>
      </div>
      <div className='inputContainer'>
        <label>Servicio</label>
        <input></input>
      </div>
      <div className='inputContainer'>
        <label>No. Cedula</label>
        <input></input>
      </div>
    </div>
  );
}

export default InfoServicio;