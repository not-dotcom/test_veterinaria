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
    const [originalCheckedDays, setOriginalCheckedDays] = useState(checkedDays);

    const dayNames = {
        Lun: 1,
        Mar: 2,
        Mie: 3,
        Jue: 4,
        Vie: 5,
        Sab: 6,
        Dom: 0
    };

    const getHorario = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/horario/${id}`);
            const jsonData = await response.json();
            setHorario(jsonData);
        } catch (err) {
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
            Lun: horario.some(h => h.dia_semana === 1),
            Mar: horario.some(h => h.dia_semana === 2),
            Mie: horario.some(h => h.dia_semana === 3),
            Jue: horario.some(h => h.dia_semana === 4),
            Vie: horario.some(h => h.dia_semana === 5),
            Sab: horario.some(h => h.dia_semana === 6),
            Dom: horario.some(h => h.dia_semana === 0),
        };
        setCheckedDays(initialCheckedDays);
        setOriginalCheckedDays(initialCheckedDays);
    }, [horario]);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        borderRadius: 5,
        boxShadow: 24,
        p: 4,
        overflow:'scroll',
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

    const handleOpen = () => {
        setOpen(true);
        setOriginalCheckedDays(checkedDays); // Guardar el estado original al abrir el modal
    };

    const handleClose = () => {
        if (JSON.stringify(checkedDays) !== JSON.stringify(originalCheckedDays)) {
            if (window.confirm('Los cambios no se guardarán. ¿Estás seguro de querer salir?')) {
                setCheckedDays(originalCheckedDays); // Restaurar el estado original si el usuario confirma
                setOpen(false);
            }
        } else {
            setOpen(false);
        }
    };

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
            window.location = "/doctors";
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
                    <Box sx={style} className="modal-content">
                        <form className="form" onSubmit={onsubmitform}>
                        <h4 className="modal-title">Editar Horario</h4>
                        <div className="doctor-info">
                            <label className='name'>Nombre del doctor: </label>
                            <label>{doctor.nombre_doctor}</label>
                            <label className='name'>Especialidad: </label>
                            <label>{doctor.especialidad}</label>
                        </div>
                        <br></br>
                            <label className='name'>Dias de trabajo</label><br></br>
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