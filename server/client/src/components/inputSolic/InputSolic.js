import React, { Fragment, useState, useEffect } from "react";
import './InputSolic.css';
import DoctorProfile from "../doctorProfile/doctorProfile";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const InputSolic = () => {

    const [doctors, setDoctors] = useState([]);
    const [availability, setAvailability] = useState([]);

    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [availableDays, setAvailableDays] = useState([]);
    const [availableTimes, setAvailableTimes] = useState([]);

    const [nombre_doctor, setNombre_doctor] = useState([]);
    const [fecha_cita, setFecha_cita] = useState("");
    const [hora_cita, setHora_cita] = useState("");
    const [paciente, setPaciente] = useState("");
    const [tipo_mascota, setTipo_mascota] = useState("");
    const [propietario, setPropietario] = useState("");
    const [cedula, setCedula] = useState("");
    const [correo, setCorreo] = useState("");
    const [telefono, setTelefono] = useState("");
    const [direccion, setDireccion] = useState("");
    const [tipo_cliente, setTipo_cliente] = useState("");
    const [servicio, setServicio] = useState("");
    const [forma_pago, setForma_pago] = useState("");
    const [created_at, setCreated_at] = useState("");

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

    const onsubmitform = async (e) => {
        e.preventDefault();
        try {
            const fecha = new Date().toISOString().slice(0, 16);
            setCreated_at(fecha);
            const body = { nombre_doctor, fecha_cita, hora_cita, paciente, tipo_mascota, propietario, cedula, correo, telefono, direccion, tipo_cliente, servicio, forma_pago, created_at: fecha };
            const response = await fetch("http://localhost:5000/solicitudes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            window.location = "/user";
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleDoctorChange = (e) => {
        const doctorId = parseInt(e.target.value);
        setSelectedDoctor(doctorId);

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
            item => item.id_doctor === selectedDoctor && item.dia_semana === dayNumber
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
        <Fragment>
            <div className="container">
                <form className="form" onSubmit={onsubmitform}>
                <h3 className="modal-title">Agenda tu cita</h3>
                    <label>Doctor</label>
                    {/* <DoctorProfile /> */}
                    
                    <label>
                        <select className="form-control" onChange={handleDoctorChange} value={selectedDoctor}>
                            <option value="">Selecciona...</option>
                            {doctors.map(doctor => (
                                <option key={doctor.id_doctor} value={doctor.id_doctor}>
                                    {doctor.nombre_doctor}
                                </option>
                            ))}
                        </select>
                    </label>

                    {selectedDoctor && (
                        <label>
                            Selecciona una fecha:
                            <br></br>
                            <DatePicker
                            className="form-control"
                                selected={startDate}
                                onChange={handleDateChange}
                                filterDate={isAvailableDay} // Filtra los días disponibles
                                placeholderText="Selecciona una fecha"
                                minDate={new Date()} // Opcional: desactivar días anteriores a hoy
                            />
                        </label>
                    )}

                    {startDate && availableTimes.length > 0 && (
                        <>
                            <label>
                                Selecciona una hora:
                                <br></br>
                                <select className="form-control">
                                    {availableTimes.map((time, index) => (
                                        <option key={index} value={time}>
                                            {time}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </>
                    )}

                    {startDate && availableTimes.length === 0 && (
                        <p>No hay horas disponibles para la fecha seleccionada.</p>
                    )}
                    <label>Nombre del Paciente</label>
                    <input type='text' className="form-control" value={paciente} onChange={e => setPaciente(e.target.value)}></input>
                    <label>Tipo de mascota</label>
                    <input type='text' className="form-control" value={tipo_mascota} onChange={e => setTipo_mascota(e.target.value)}></input>
                    <label>Nombre del Propietario</label>
                    <input type='text' className="form-control" value={propietario} onChange={e => setPropietario(e.target.value)}></input>
                    <label>No. de Cedula</label>
                    <input type='text' className="form-control" value={cedula} onChange={e => setCedula(e.target.value)}></input>
                    <label>Correo</label>
                    <input type='email' className="form-control" value={correo} onChange={e => setCorreo(e.target.value)}></input>
                    <label>No. de Telefono</label>
                    <input type='text' className="form-control" value={telefono} onChange={e => setTelefono(e.target.value)}></input>
                    <label>Direccion</label>
                    <input type='text' className="form-control" value={direccion} onChange={e => setDireccion(e.target.value)}></input>
                    <label>Tipo de cliente</label>
                    <select className="form-control" value={tipo_cliente} onChange={e => setTipo_cliente(e.target.value)}>
                        <option value="Graduado">Graduado</option>
                        <option value="Part.">Part.</option>
                        <option value="Estudiante">Estudiante</option>
                        <option value="Docente">Docente</option>
                        <option value="ADMO">ADMO.</option>
                    </select>
                    <label>Servicio</label>
                    <select className="form-control" value={servicio} onChange={e => setServicio(e.target.value)}>
                        <option value="ConsultaG general">Consulta General</option>
                        <option value="Vacunacion">Vacunacion</option>
                        <option value="Consulta + Ecografia">Consulta + Ecografia</option>
                        <option value="Consulta + Rayos X">Consulta + Rayos X</option>
                        <option value="Consulta prequirurgica">Consulta Prequirurgica</option>
                        <option value="Consulta ortopedica">Consulta Ortopedica (Martes y Viernes - 08:00 - 12:00)</option>
                        <option value="Consulta oncologica">Consulta Oncologica (Martes y Viernes - 08:00 - 12:00)</option>
                    </select>
                    <label>Forma de pago</label>
                    <input type='text' className="form-control" value={forma_pago} onChange={e => setForma_pago(e.target.value)}></input>
                    <label hidden="true">Fecha de creacion</label>
                    <input hidden="true" type='datetime-local' className="form-control" value={created_at} onChange={e => setCreated_at(e.target.value)}></input>
                    <div className="button-container">
                    <button type="submit" className='btn btn-success'>Agendar</button>
                    </div>
                
                </form>
            </div>
        </Fragment>
    )
}

export default InputSolic;