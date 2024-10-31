import React, { Fragment, useState } from 'react';
import { Button, Modal, Box, Typography } from '@mui/material';
import './editSolic2.css';
import logo from '../../media/profile.jpg'; // Importa la imagen del logo

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
        p: 0, // Elimina el padding
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
                <Button onClick={handleOpen}>Imprimir Cita</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <div className='header'>
                            <img src={logo} alt="Logo" className='logo' /> {/* Agrega la imagen del logo */}
                            Cliníca Veterinaria UDES
                        </div>
                        <div className='fecha'>{fechaDeCreacion}</div>
                        <div className='cita-agendada'>Cita agendada</div>
                        <div className='content'>
                            <p>
                                <label className='name'>Nombre del propietario: </label> {solicitud.propietario}<br/>
                                <label className='name'>Numero de cedula:</label> {solicitud.cedula}<br/>
                                <label className='name'>Nombre del paciente:</label> {solicitud.paciente}<br/>
                                <label className='name'>Cita agendada el dia:</label> {fecha_cita} a las {solicitud.hora_cita} <br/>
                                <label className='name'>Tipo de servicio:</label> {solicitud.servicio}<br/> 
                                <label className='name'>Forma de pago:</label> {solicitud.forma_pago}<br/>
                                <label className='name'>Tipo de cliente:</label> {solicitud.tipo_cliente}<br/>
                                <label className='name'>Direccion del paciente:</label> {solicitud.direccion}<br/>
                                <label className='name'>Telefono del propietario:</label> {solicitud.telefono}<br/> 
                                <label className='name'>Correo del propietario:</label> <a href={"mailto:" + solicitud.correo}>{solicitud.correo}</a>
                            </p>
                        </div>
                    </Box>
                </Modal>
            </div>
        </Fragment>
    );
};

export default EditSolic2;