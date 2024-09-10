import React, { Fragment, useState, useEffect } from "react";
import { Button, Modal, Box, Typography } from '@mui/material';

import "./horarios.css";

const Horarios = ({ doctor }) => {
    const [horario, setHorario] = useState([]);

    const dayNames = {
        Lun: 'Lunes',
        Mar: 'Martes',
        Mie: 'Miércoles',
        Jue: 'Jueves',
        Vie: 'Viernes',
        Sab: 'Sábado',
        Dom: 'Domingo'
    };

    const getHorario = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/horario/${id}`);
            const jsonData = await response.json();
            setHorario(jsonData);
        } catch (err) {
            console.log(err.message + "test");
        }
    };

    const id = doctor.id_doctor;
    useEffect(() => {
        if (id) {
            getHorario(id);
        }
    }, [id]);

    const initialCheckedDays = {
        Lun: horario.some(h => h.dia_semana === 'Lunes'),
        Mar: horario.some(h => h.dia_semana === 'Martes'),
        Mie: horario.some(h => h.dia_semana === 'Miércoles'),
        Jue: horario.some(h => h.dia_semana === 'Jueves'),
        Vie: horario.some(h => h.dia_semana === 'Viernes'),
        Sab: horario.some(h => h.dia_semana === 'Sábado'),
        Dom: horario.some(h => h.dia_semana === 'Domingo'),
    };

    const [checkedDays, setCheckedDays] = useState(initialCheckedDays);

    useEffect(() => {
        setCheckedDays({
            Lun: horario.some(h => h.dia_semana === 'Lunes'),
            Mar: horario.some(h => h.dia_semana === 'Martes'),
            Mie: horario.some(h => h.dia_semana === 'Miércoles'),
            Jue: horario.some(h => h.dia_semana === 'Jueves'),
            Vie: horario.some(h => h.dia_semana === 'Viernes'),
            Sab: horario.some(h => h.dia_semana === 'Sábado'),
            Dom: horario.some(h => h.dia_semana === 'Domingo'),
        });
    }, [horario]);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 550,
        bgcolor: 'background.paper',
        borderRadius: 5,
        boxShadow: 24,
        p: 4,
    };

    const [open, setOpen] = useState(false);

    const handleCheckboxChange = (day) => {
        setCheckedDays(prevState => ({
            ...prevState,
            [day]: !prevState[day]
        }));
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const onsubmitform = async (e) => {
        e.preventDefault();
        try {
            const body = {};
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
            <div className="">
                <Button onClick={handleOpen}>Editar horario</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <form className="form" onSubmit={onsubmitform}>
                            <label>Nombre del doctor: </label>
                            <label className='name'>{doctor.nombre_doctor}</label><br></br>
                            <label>Especialidad: </label>
                            <label className='name'>{doctor.especialidad}</label><br></br>
                            <label>Dias de trabajo</label><br></br>
                            <div className="dayContainer">
                                {Object.keys(checkedDays).map(day => (
                                    <div
                                        key={day}
                                        className="check"
                                        style={{
                                            backgroundColor: checkedDays[day] ? 'black' : 'white',
                                            color: checkedDays[day] ? 'white' : 'black'
                                        }}
                                        onClick={() => handleCheckboxChange(day)}
                                    >
                                        {day}<input type="checkbox" checked={checkedDays[day]} onChange={() => handleCheckboxChange(day)}></input>
                                    </div>
                                ))}
                            </div>

                            {/* Mostrar los horarios seleccionados */}
                            <div className="horariosDiv">
                                {Object.keys(checkedDays).map(day => (
                                    checkedDays[day] && (
                                        <div key={day} className="horario">
                                            <label>Horario {dayNames[day]}</label>

                                            {/* Obtener los horarios del día seleccionado */}
                                            {horario
                                                .filter(h => h.dia_semana === dayNames[day])
                                                .map((h, index) => (
                                                    <div key={index}>
                                                        <label>Hora inicio:</label>
                                                        <input
                                                            className="form-control"
                                                            type="time"
                                                            value={h.hora_inicio} // Convertir 'time with time zone' a formato 'HH:MM'
                                                        />
                                                        <br />
                                                        <label>Hora final:</label>
                                                        <input
                                                            className="form-control"
                                                            type="time"
                                                            value={h.hora_final} // Convertir 'time with time zone' a formato 'HH:MM'
                                                        />
                                                    </div>
                                                ))}
                                        </div>
                                    )
                                ))}
                            </div>

                            {/*<button type="submit" className='btn btn-success'>Actualizar horario</button>*/}

                        </form>

                    </Box>

                </Modal>
            </div>
        </Fragment>
    );
}

export default Horarios;