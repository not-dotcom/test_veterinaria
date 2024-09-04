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
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        borderRadius: 5,
        boxShadow: 24,
        p: 4,
    };
    let fecha = new Date(solicitud.fecha_cita);
    let fecha_cita = fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear();

    
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
                        <Typography id="modal-modal-title" variant="h6" component="h3">
                            Editar cita
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            {/* <label>Fecha</label>
                            <input className='form-control' value={solicitud.fecha_cita} disabled="true"></input>
                            <label>Hora</label>
                            <input className='form-control' value={solicitud.hora_cita}></input>
                            <label>Paciente</label>
                            <input className='form-control' value={solicitud.paciente}></input>
                            <label>Tipo de mascota</label>
                            <input className='form-control' value={solicitud.tipo_mascota}></input>
                            <label>Propietario</label>
                            <input className='form-control' value={solicitud.propietario}></input>
                            <label>Cedula</label>
                            <input className='form-control' value={solicitud.cedula}></input>
                            <label>Correo</label>
                            <input className='form-control' value={solicitud.correo}></input>
                            
                            <input className='form-control' value={solicitud.telefono}></input>
                            
                            <input className='form-control' value={solicitud.direccion}></input>
                            
                            <input className='form-control' value={solicitud.tipo_cliente}></input>
                            
                            <input className='form-control' value={solicitud.servicio}></input>
                            
                            <input className='form-control' value={solicitud.forma_pago}></input> */}
                            <p>
                                El propietario <label className='name'>{solicitud.propietario}</label> con cedula {solicitud.cedula} tiene una cita para el paciente {solicitud.paciente} el dia {fecha_cita} a las {solicitud.hora_cita} para el servicio de {solicitud.servicio} con forma de pago {solicitud.forma_pago} y tipo de cliente {solicitud.tipo_cliente} en la direccion {solicitud.direccion} y telefono {solicitud.telefono} y correo {solicitud.correo}
                            </p>
                            
                        
                        </Typography>
                    </Box>
                </Modal>
            </div>
        </Fragment>
    );
};

export default EditSolic2;