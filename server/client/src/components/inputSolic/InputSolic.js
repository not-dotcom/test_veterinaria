import React, { Fragment, useState, useEffect } from "react";
import './InputSolic.css';
import DoctorProfile from "../doctorProfile/doctorProfile";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ListSolicitudes from "../get/ListSolic";

import InfoContacto from "./form/infoContacto/InfoContacto";
import InfoPaciente from "./form/infoPaciente/InfoPaciente";
import InfoServicio from "./form/infoServicio/InfoServicio";
import Revision from "./form/Revision/Revision";

const InputSolic = ({ getSolicitudes, getBlockedHours }) => {

    const [page, setPage] = useState(0);
    /*-------------------------------------*/
    const [formData, setFormData] = useState({
        paciente: {} // Aquí se almacenarán los datos de InfoPaciente
    });
    const handleDataChange = (newData) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            paciente: newData
        }));
    };


    /**---------------------------------------------------------- */

    const [doctors, setDoctors] = useState([]);
    const [availability, setAvailability] = useState([]);

    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [availableDays, setAvailableDays] = useState([]);
    const [availableTimes, setAvailableTimes] = useState([]);

    const [nombre_doctor, setNombre_doctor] = useState([]);
    const [fecha_cita, setFecha_cita] = useState("");
    const [hora_cita, setHora_cita] = useState("");
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
            const body = { selectedDoctor, startDate, hora_cita, tipo_mascota, propietario, cedula, correo, telefono, direccion, tipo_cliente, servicio, forma_pago, created_at: fecha };
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

    const FormTitles = ["Paciente", "Servicio", "Contacto", "Revision"];

    const PageDisplay = () => {
        switch (page) {
            case 0:
                return <InfoPaciente   
                data={formData.paciente} onDataChange={handleDataChange}/>
            case 1:
                return <InfoServicio ></InfoServicio>
            case 2:
                return <InfoContacto ></InfoContacto>
            case 3:
                return <Revision ></Revision>
            default:
                return <InfoPaciente ></InfoPaciente>
        }
    }



    return (
        <div className="formContainer" >
            <div className='form'>
                <div className='progressbar'></div>
                <div className='form-container'>
                    <div className='header'>
                        <h1>{FormTitles[page]}</h1>
                    </div>
                    <div className='body'>{PageDisplay()}</div>
                    <div className='footer'>
                        <button
                            disabled={page == FormTitles < 0}
                            onClick={() => {
                                setPage((currPage) => currPage - 1);
                            }}

                        >Prev</button>
                        <button
                            disabled={page == FormTitles.length - 1}
                            onClick={() => {
                                setPage((currPage) => currPage + 1);
                            }}
                        >
                            Next</button>
                    </div>
                </div>

            </div>

        </div>

    )
}

export default InputSolic;