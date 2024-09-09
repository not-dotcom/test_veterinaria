import React, { Fragment, useState, useEffect } from "react";

import { Button, Modal, Box, Typography } from '@mui/material';
import './InputDoctor.css';

const InputDoctor = ({solicitud}) => {
    const [nombreDoctores, setNombreDoctores] = useState([]);
=======
import './InputDoctor.css';

const InputDoctor = () => {
    const [nombreDoctores, setNombreDoctores] = useState([]);




    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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

    //ESTO NO SE PARA QUE ES

=======


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
                    </Box>
                </Modal>
            </div>


=======
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