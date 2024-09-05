import React, { Fragment, useState } from 'react';
import { Button, Modal, Box, Typography } from '@mui/material';
import './editSolic2.css';
const EditSolic2 = ({ solicitud }) => {
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

    function formatFecha(fechaISO) {
        const fecha = new Date(fechaISO);
    
        const dias = fecha.getUTCDate();
        const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
        const mes = meses[fecha.getUTCMonth()];
        const año = fecha.getUTCFullYear();
    
        return `${dias} del ${mes} del ${año}`;
    }

    let fecha = new Date(solicitud.fecha_cita);
    let fecha_cita = formatFecha(fecha);


    const fecha2 = new Date(solicitud.created_at);
    const fechaDeCreacion = formatFecha(fecha2);

    return (
        <Fragment>
            <div>
                <Button onClick={handleOpen}>Editar</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <h1>
                            <Typography id="modal-modal-title" variant="h6" component="h3">
                                Clinica Veterinaria UDES
                            </Typography>
                            <Typography id="modal-modal-description" variant="h6" component="h3">
                                {fechaDeCreacion}
                            </Typography>

                        </h1>
                        <p>
                            <label className='name'>Cita agendada.</label>
                            </p>
                            <p>
                            Nombre del propietario: <label className='name'>{solicitud.propietario}</label> <br/>
                            Numero de cedula {solicitud.cedula}<br/>
                            Nombre del paciente: {solicitud.paciente}<br/>
                            Cita agendada el dia <label className='name'>{fecha_cita}</label> a las {solicitud.hora_cita} <br/>
                            Tipo de servicio: {solicitud.servicio}<br/> 
                            Forma de pago: {solicitud.forma_pago}<br/>
                            Tipo de cliente: {solicitud.tipo_cliente}<br/>
                            Direccion del paciente: {solicitud.direccion}<br/>
                            Telefono del propietario: {solicitud.telefono}<br/> Correo del propietario: <a href={"mailto:" + solicitud.correo}>{solicitud.correo}</a>
                        </p>



                    
                </Box>
            </Modal>
        </div>
        </Fragment >
    );
};

export default EditSolic2;