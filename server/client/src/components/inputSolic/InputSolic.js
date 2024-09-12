import React, { Fragment, useState, useEffect } from "react";
import './InputSolicitud.css';
import DoctorProfile from "../doctorProfile/doctorProfile";

const InputSolic = () => {
    const [nombre_doctores, setNombre_doctores] = useState([]);

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
    const [horaFecha, setHoraFecha] = useState("");

    const fetchDoctores = async () => {
        try {
            const response = await fetch("http://localhost:5000/doctores");
            const data = await response.json();
            const results = [];
            data.forEach((value) => {
                results.push({
                    key: value.nombre_doctor,
                    value: value.nombre_doctor,
                    //value: value.id_doctor, //cuando se maneje con pk cambiar a id_doctor
                });
            });
            setNombre_doctores([
                { key: 'Selecciona un doctor', value: '' },
                ...results
            ]);

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchDoctores();
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

    return (
        <Fragment>
            <div className="container">
                <form className="form" onSubmit={onsubmitform}>
                    <label>Doctor</label>
                    <DoctorProfile />
                    <select className="form-control" hidden="true" value={nombre_doctor} onChange={e => setNombre_doctor(e.target.value)}>
                        {nombre_doctores.map((doctor) => (
                            <option key={doctor.value} value={doctor.value}>
                                {doctor.key}
                            </option>
                        ))}
                    </select>
                    <label>Fecha de la cita</label>
                    <input type='date' className="form-control" value={fecha_cita} onChange={e => setFecha_cita(e.target.value)}></input>
                    <label>Hora de la cita</label>
                    <input type='time' className="form-control" value={hora_cita} onChange={e => setHora_cita(e.target.value)}></input>
                    <label>Paciente</label>
                    <input type='text' className="form-control" value={paciente} onChange={e => setPaciente(e.target.value)}></input>
                    <label>Tipo de mascota</label>
                    <input type='text' className="form-control" value={tipo_mascota} onChange={e => setTipo_mascota(e.target.value)}></input>
                    <label>Propietario</label>
                    <input type='text' className="form-control" value={propietario} onChange={e => setPropietario(e.target.value)}></input>
                    <label>Cedula</label>
                    <input type='text' className="form-control" value={cedula} onChange={e => setCedula(e.target.value)}></input>
                    <label>Correo</label>
                    <input type='email' className="form-control" value={correo} onChange={e => setCorreo(e.target.value)}></input>
                    <label>Telefono</label>
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
                    <br></br>
                    <button type="submit" className='btn btn-success'>Agendar cita</button>
                </form>
            </div>
        </Fragment>
    )
}

export default InputSolic;