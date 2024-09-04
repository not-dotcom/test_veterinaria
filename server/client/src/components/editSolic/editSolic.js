import React, { Fragment, useState } from 'react';

const EditSolic = ({solicitud}) => {
    const[fecha_cita, setFecha_cita] = useState(solicitud.fecha_cita);
    const[hora_cita, setHora_cita] = useState(solicitud.hora_cita);
    const[paciente, setPaciente] = useState(solicitud.paciente);
    const[tipo_mascota, setTipo_mascota] = useState(solicitud.tipo_mascota);
    const[propietario, setPropietario] = useState(solicitud.propietario);
    const[cedula, setCedula] = useState(solicitud.cedula);
    const[correo, setCorreo] = useState(solicitud.correo);
    const[telefono, setTelefono] = useState(solicitud.telefono);
    const[direccion, setDireccion] = useState(solicitud.direccion);
    const[tipo_cliente, setTipo_cliente] = useState(solicitud.tipo_cliente);
    const[servicio, setServicio] = useState(solicitud.servicio);
    const[forma_pago, setForma_pago] = useState(solicitud.forma_pago);


    return (
        <Fragment>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#id${solicitud.id_solic}`}>
                Editar
            </button>

            <div class="modal fade" id={`id${solicitud.id_solic}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Editar cita</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <input className='form-control' value={fecha_cita}></input>
                            <input className='form-control' value={hora_cita}></input>
                            <input className='form-control' value={paciente}></input>
                            <input className='form-control' value={tipo_mascota}></input>
                            <input className='form-control' value={propietario}></input>
                            <input className='form-control' value={cedula}></input>
                            <input className='form-control' value={correo}></input>
                            <input className='form-control' value={telefono}></input>
                            <input className='form-control' value={direccion}></input>
                            <input className='form-control' value={tipo_cliente}></input>
                            <input className='form-control' value={servicio}></input>
                            <input className='form-control' value={forma_pago}></input>


                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );


};
export default EditSolic;