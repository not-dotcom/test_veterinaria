import React, { Fragment, useState, useEffect } from "react";
import {
    MaterialReactTable, useMaterialReactTable,
} from 'material-react-table';
import { Button, Modal, Box, Typography } from '@mui/material';
import './InputDoctor.css';
import Horarios from '../horarios/horarios';
import HorarioDoctor from "../horarioDoctor/HorarioDoctor"

const InputDoctor = () => {
    const [doctores, setDoctores] = useState([]);

    const [cedulaCiudadania, setCedulaCiudadania] = useState("");
    const [nombreDoctor, setNombreDoctor] = useState("");
    const [numeroTelefono, setNumeroTelefono] = useState("");
    const [especialidad, setEspecialidad] = useState("");

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

    const getDoctores = async () => {
        try {
            const response = await fetch("http://localhost:5000/doctores",{
                method: "GET",
                credentials: 'include', // Añade esta línea
                headers: {
                "Content-Type": "application/json"
                }
            });
            const jsonData = await response.json();
            setDoctores(jsonData);
            console.log(jsonData);
        } catch (err) {
            console.log(err.message);
        }
    };

    const deleteDoctor = async (id) => {
        try {
            console.log("Deleting doctor with id:", id); // Log the id
            const response = await fetch(`http://localhost:5000/doctores/${id}`, {
                method: "DELETE",
                credentials: 'include' // Añade esta línea

            });
            console.log(response);
            // Optionally, remove the deleted solicitud from the state
            setDoctores(doctores.filter(doctor => doctor.id_doctor !== id));
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        getDoctores();
    }, []);

    const columnsDoctores = [
        {
            accessorKey: "nombre_doctor",
            header: "Nombre",
        },
        {
            accessorKey: "cedula_ciudadania",
            header: "Cedula",
        },
        {
            accessorKey: "numero_telefono",
            header: "Numero de telefono",
        },
        {
            accessorKey: "especialidad",
            header: "Especialidad",
        },
        {
            accessorKey: "edit",
            header: "Editar",
            Cell: ({ row }) => <Horarios doctor={row.original} />,
        },
        {
            accessorKey: "horarios",
            header: "Ver horario",
            Cell: ({ row }) => <HorarioDoctor doctor={row.original} />,
        },
        {
            accessorKey: "delete",
            header: "Eliminar",
            Cell: ({ row }) => <button onClick={() => deleteDoctor(row.original.id_doctor)} className='btn btn-danger'>Eliminar</button>
        },
    ];

    const onsubmitform = async (e) => {
        e.preventDefault();
        try {
            const body = { cedulaCiudadania, nombreDoctor, numeroTelefono, especialidad };
            const response = await fetch("http://localhost:5000/doctores", {
                method: "POST",
                credentials: 'include', // Añade esta línea
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            window.location = "/doctors";
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <Fragment>
            <MaterialReactTable
                /*Aqui van los valores de las tablas de doctores*/
                columns={columnsDoctores}
                data={doctores}
                enableRowSelection={true}
                renderTopToolbarCustomActions={() => (
                    <div className="headerTable">
                        <label className="tableTitle">Doctores</label>
                        <button onClick={handleOpen} className='btn btn-success'>Agregar</button>
                    </div>

                )
                }
                muiTopToolbarProps={
                    {
                        style: {
                            display: 'flex',
                        }
                    }
                }



            >

            </MaterialReactTable>


            <div className="">
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <form className="form" onSubmit={onsubmitform}>
                            <h3 className="modal-title">Agregar Doctor</h3>
                            <label>Nombre</label>
                            <input type='text' className="form-control" value={nombreDoctor} onChange={e => setNombreDoctor(e.target.value)}></input>
                            <label>Cedula de ciudadania</label>
                            <input type='text' className="form-control" value={cedulaCiudadania} onChange={e => setCedulaCiudadania(e.target.value)}></input>
                            <label>Especialidad</label>
                            <input type='text' className="form-control" value={especialidad} onChange={e => setEspecialidad(e.target.value)}></input>
                            <label>Numero de telefono</label>
                            <input type='number' className="form-control" value={numeroTelefono} onChange={e => setNumeroTelefono(e.target.value)}></input>
                            <br></br>
                            <div className="button-container">
                                <button type="submit" className='btn btn-success'>Agregar</button>
                            </div>
                        </form>
                    </Box>
                </Modal>
            </div>


        </Fragment>


    )
}

export default InputDoctor;