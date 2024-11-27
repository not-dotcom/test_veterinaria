import React, { Fragment, useState, useEffect } from "react";
import { Button, Modal, Box, Typography } from '@mui/material';
import './HorarioDoctor.css';

const HorarioDoctor = ({ doctor }) => {
    const [horario, setHorario] = useState([]);
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        maxWidth: '1200px',
        bgcolor: 'background.paper',
        borderRadius: 5,
        boxShadow: 24,
        p: 4,
    };

    const dayNames = [1,2,3,4,5,6,0];
    const dayNamesTable = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    const timeSlots = [
        '08:00 - 08:30','08:30 - 09:00', '09:00 - 09:30', '09:30 - 10:00', '10:00 - 10:30', '10:30 - 11:00', '11:00 - 11:30', '11:30 - 12:00', '12:00 - 12:30', '12:30 - 13:00', '13:00 - 13:30', '13:30 - 14:00', '14:00 - 14:30', '14:30 - 15:00', '15:00 - 15:30', '15:30 - 16:00', '16:00 - 16:30', '16:30 - 17:00', '17:00 - 17:30', '17:30 - 18:00', '18:00 - 18:30', '18:30 - 19:00', '19:00 - 19:30', '19:30 - 20:00'
    ];

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

    const isTimeSlotOccupied = (day, timeRange) => {
        const [startTime, endTime] = timeRange.split(' - ').map(time => {
            const [hour, minute] = time.split(':').map(Number);
            return hour * 60 + minute;
        });

        return horario.some(h => {
            const [startHour, startMinute] = h.hora_inicio.split(':').map(Number);
            const [endHour, endMinute] = h.hora_final.split(':').map(Number);

            const slotStartTime = startHour * 60 + startMinute;
            const slotEndTime = endHour * 60 + endMinute;

            return h.dia_semana === day && (
                (startTime >= slotStartTime && startTime < slotEndTime) ||
                (endTime > slotStartTime && endTime <= slotEndTime) ||
                (startTime <= slotStartTime && endTime >= slotEndTime)
            );
        });
    };

    const printHorario = () => {
        window.print();
    };

    return (
        <Fragment>
            <div className="">
                <Button onClick={handleOpen}>Ver horario</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" className="doctor-name">
                            Horarios de los Doctores - {doctor.nombre_doctor}
                        </Typography>
                        <div className="horario-text">
                            {dayNames.map(day => {
                                const horariosDia = horario.filter(h => h.dia_semana === day);
                                if (horariosDia.length > 0) {
                                    return (
                                        <span key={day}>
                                            <strong>{day}:</strong> {horariosDia.map(h => `${h.hora_inicio} - ${h.hora_final}`).join(', ')}{' '}
                                        </span>
                                    );
                                }
                                return null;
                            })}
                        </div>
                        <div className="table-container">
                            <table className="horario-table">
                                <thead>
                                    <tr>
                                        <th>Hora</th>
                                        {dayNamesTable.map(day => (
                                            <th key={day}>{day}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {timeSlots.map((time, index) => (
                                        <tr key={index}>
                                            <td>{time}</td>
                                            {dayNames.map(day => (
                                                <td key={day} className={isTimeSlotOccupied(day, time) ? 'occupied' : ''}></td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Button onClick={printHorario} variant="contained" color="primary" style={{ marginTop: '20px' }}>
                            Imprimir Horario
                        </Button>
                    </Box>
                </Modal>
            </div>
        </Fragment>
    );
}

export default HorarioDoctor;