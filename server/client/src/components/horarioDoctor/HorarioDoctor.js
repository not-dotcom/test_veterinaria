import React, { Fragment, useState, useEffect } from "react";
import { Button, Modal, Box, Typography } from '@mui/material';
import './HorarioDoctor.css';

const InputDoctor = ({solicitud}) => {
    const [nombreDoctores, setNombreDoctores] = useState([]);
    const [nombreDoctor, setNombreDoctor] = useState("");
    const [dia, setDia] = useState("");
    const [inicioHorario, setInicioHorio] = useState("");
    const [finHorario, setFinHorario] = useState("");
    const [intervaloCitas, setIntervaloDias] = useState("");

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
                    <img src={require('../../media/Horario.jpg')} width="500" height="300" class="" alt="Profile Image"></img>
                    </Box>
                </Modal>
            </div>


        </Fragment>


    )
}

export default InputDoctor;