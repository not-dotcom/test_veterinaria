import React, { Fragment, useState, useEffect } from "react";
import { Button, Modal, Box, Typography } from '@mui/material';

import "./horarios.css";




const Horarios = () => {
    const [checkedDays, setCheckedDays] = useState({
        Lun: false,
        Mar: false,
        Mie: false,
        Jue: false,
        Vie: false,
        Sab: false,
        Dom: false
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

    const handleCheckboxChange = (day) => {
        setCheckedDays(prevState => ({
            ...prevState,
            [day]: !prevState[day]
        }));
    };
    const [open, setOpen] = useState(false);

const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);

    return (
        <Fragment>
        <div>
            <div className="">
            <Button onClick={handleOpen}>Editar horario</Button>
                <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                    <form className="form">
                    <label>Nombre</label>
                    <input className="form-control"></input>
                    <label>Especialidad</label>
                    <input className="form-control"></input>
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
                    <div className="horariosDiv">
                        {Object.keys(checkedDays).map(day => (
                            checkedDays[day] && (
                                <div key={day} className="horario">
                                    <label>Horario {dayNames[day]}</label>
                                    <label>Hora inicio:</label>
                                    <input className="form-control"></input>
                                    <label>Hora final</label>
                                    <input className="form-control"></input>
                                </div>
                            )
                        ))}
                    </div>
                </form>                    </Box>
                </Modal>
                
            </div>
        </div>
        </Fragment>
    );
}

export default Horarios;