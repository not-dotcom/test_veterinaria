import React, { Fragment, useState, useEffect } from "react";
import './InputDoctor.css';
import Timetable from 'react-timetable-events'

const InputDoctor = () => {
    const [nombreDoctores, setNombreDoctores] = useState([]);

    const [nombreDoctor, setNombreDoctor] = useState("");
    const [dia, setDia] = useState("");
    const [inicioHorario, setInicioHorio] = useState("");
    const [finHorario, setFinHorario] = useState("");
    const [intervaloCitas, setIntervaloDias] = useState("");

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
            setNombreDoctores([
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
            const body = { nombreDoctor, dia, inicioHorario, finHorario, intervaloCitas };
            const response = await fetch("http://localhost:5000/horario", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            window.location = "/doctors";
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <Fragment>
            <div className="container">
                <form className="form" onSubmit={onsubmitform}>
                    <label>Doctor</label>
                    <select className="form-control" value={nombreDoctor} onChange={e => setNombreDoctor(e.target.value)}>
                        {nombreDoctores.map((doctor) => (
                            <option key={doctor.value} value={doctor.value}>
                                {doctor.key}
                            </option>
                        ))}
                    </select>
                    <label>Dia</label>
                    <select className="form-control" value={dia} onChange={e => setDia(e.target.value)}>
                        <option>Lunes</option>
                        <option>Martes</option>
                        <option>Miercoles</option>
                        <option>Jueves</option>
                        <option>Viernes</option>
                        <option>Sabado</option>
                        <option>Domingo</option>
                    </select>
                    <label>Inicio de labores</label>
                    <input type='time' className="form-control" value={inicioHorario} onChange={e => setInicioHorio(e.target.value)}></input>
                    <label>Fin de labores</label>
                    <input type='time' className="form-control" value={finHorario} onChange={e => setFinHorario(e.target.value)}></input>
                    <label>Duracion de cada cita:</label>
                    <input type='number' className="form-control" value={intervaloCitas} onChange={e => setIntervaloDias(e.target.value)}></input>
                    <br></br>
                    <button type="submit" className='btn btn-success'>Agendar cita</button>
                </form>
            </div>

        </Fragment>


    )
}

export default InputDoctor;