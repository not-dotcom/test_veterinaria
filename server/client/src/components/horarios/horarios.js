import React, { Fragment, useState, useEffect } from "react";
import { Button, Modal, Box, Typography } from '@mui/material';

import "./horarios.css";

const Horarios = ({ doctor }) => {
    const [horario, setHorario] = useState([]);
    const [checkedDays, setCheckedDays] = useState({
        Lun: false,
        Mar: false,
        Mie: false,
        Jue: false,
        Vie: false,
        Sab: false,
        Dom: false,
    });

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

    useEffect(() => {
        const initialCheckedDays = {
            Lun: horario.some(h => h.dia_semana === 'Lunes'),
            Mar: horario.some(h => h.dia_semana === 'Martes'),
            Mie: horario.some(h => h.dia_semana === 'Miércoles'),
            Jue: horario.some(h => h.dia_semana === 'Jueves'),
            Vie: horario.some(h => h.dia_semana === 'Viernes'),
            Sab: horario.some(h => h.dia_semana === 'Sábado'),
            Dom: horario.some(h => h.dia_semana === 'Domingo'),
        };
        setCheckedDays(initialCheckedDays);
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

    // Función para actualizar el horario en el estado cuando el usuario cambia un valor
    const handleHorarioChange = (day, field, value) => {
        const updatedHorarios = horario.map((h) => {
            if (h.dia_semana === day) {
                return {
                    ...h,
                    [field]: value, // Actualizar la hora_inicio o la hora_final dependiendo del campo
                };
            }
            return h;
        });
        setHorario(updatedHorarios);
    };
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const onsubmitform = async (e) => {
        e.preventDefault();

        try {
            const selectedDays = Object.keys(checkedDays).filter(day => checkedDays[day]);

            const horariosSeleccionados = selectedDays.map(day => {
                const horariosDelDia = horario.filter(h => h.dia_semana === dayNames[day]);

                if (horariosDelDia.length > 0) {
                    return {
                        dia_semana: dayNames[day],
                        hora_inicio: horariosDelDia[0].hora_inicio,
                        hora_final: horariosDelDia[0].hora_final
                    };
                } else {
                    const inputHoraInicio = document.querySelector(`input[name="hora_inicio_${day}"]`);
                    const inputHoraFinal = document.querySelector(`input[name="hora_final_${day}"]`);

                    return {
                        dia_semana: dayNames[day],
                        hora_inicio: inputHoraInicio ? inputHoraInicio.value : '',
                        hora_final: inputHoraFinal ? inputHoraFinal.value : ''
                    };
                }
            });

            const horariosValidos = horariosSeleccionados.every(h => h.hora_inicio && h.hora_final);
            if (!horariosValidos) {
                alert('Por favor, asegúrate de que todos los horarios tengan una hora de inicio y final.');
                return;
            }

            const data = {
                id_doctor: doctor.id_doctor, // ID del doctor
                horarios: horariosSeleccionados // Array con los días y sus horarios
            };

            // Enviar los datos al servidor
            const response = await fetch(`http://localhost:5000/horario`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            // Verificar la respuesta del servidor
            const responseData = await response.json();
            if (response.ok) {
                alert('Horarios actualizados correctamente.');
                getHorario(doctor.id_doctor);
            } else {
                alert('Error al actualizar los horarios: ' + responseData.message);
            }
        } catch (err) {
            console.error('Error al enviar el formulario:', err);
            alert('Hubo un error al enviar el formulario.');
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
                                                            value={h.hora_inicio} // Valor del input
                                                            onChange={(e) =>
                                                                handleHorarioChange(dayNames[day], 'hora_inicio', e.target.value)
                                                            } // Actualizar el valor
                                                        />
                                                        <label>Hora final:</label>
                                                        <input
                                                            className="form-control"
                                                            type="time"
                                                            value={h.hora_final} // Valor del input
                                                            onChange={(e) =>
                                                                handleHorarioChange(dayNames[day], 'hora_final', e.target.value)
                                                            } // Actualizar el valor
                                                        />
                                                    </div>
                                                ))}
                                            {/* Agregar nuevos campos de horario solo si no hay horarios existentes */}
                                            {horario.filter(h => h.dia_semana === dayNames[day]).length === 0 && (
                                                <div>
                                                    <label>Hora inicio:</label>
                                                    <input
                                                        className="form-control"
                                                        type="time"
                                                        name={`hora_inicio_${day}`} // Nombre dinámico basado en el día
                                                        defaultValue=""
                                                    />
                                                    <label>Hora final:</label>
                                                    <input
                                                        className="form-control"
                                                        type="time"
                                                        name={`hora_final_${day}`} // Nombre dinámico basado en el día
                                                        defaultValue=""
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    )
                                ))}
                            </div>

                            {/* Botón de guardar cambios */}
                            <button type="submit" className='btn btn-success'>Guardar cambios</button>

                        </form>

                    </Box>

                </Modal>
            </div>
        </Fragment>
    );
}

export default Horarios;