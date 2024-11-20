import React, { Fragment, useEffect, useState } from 'react';
import {
    MaterialReactTable, useMaterialReactTable,
} from 'material-react-table';
import EditSolic2 from '../editSolic/editSolic2';
import './ListSolic.css';



const ListSolicitudes = () => {
    const [solicitudes, setSolicitudes] = useState([]);
    const [blockedHours, setBlockedHours] = useState([]);

    const deleteSolicitud = async (id) => {
        try {
            console.log("Deleting solicitud with id:", id); // Log the id
            const response = await fetch(`http://localhost:5000/solicitudes/${id}`, {
                method: "DELETE"
            });
            console.log(response);
            // Optionally, remove the deleted solicitud from the state
            setSolicitudes(solicitudes.filter(solicitud => solicitud.id_solic !== id));
        } catch (err) {
            console.log(err.message);
        }
    };

    const getSolicitudes = async () => {
        try {
            const response = await fetch("http://localhost:5000/solicitudes",{
                method: "GET",
                credentials: 'include', // Añade esta línea
                headers: {
                "Content-Type": "application/json"
                }
            });
            const jsonData = await response.json();
            setSolicitudes(jsonData);
        } catch (err) {
            console.log(err.message);
        }
    };

    const getBlockedHours = async () => {
        try {
            const response = await fetch("http://localhost:5000/blocked-hours");
            const jsonData = await response.json();
            setBlockedHours(jsonData);
        } catch (err) {
            console.log(err.message);
        }
    };

    const toggleHour = async (hour) => {
        try {
            const method = blockedHours.includes(hour) ? "DELETE" : "POST";
            const response = await fetch("http://localhost:5000/blocked-hours", {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ hour })
            });
            const updatedBlockedHours = await response.json();
            setBlockedHours(updatedBlockedHours);
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        getSolicitudes();
        getBlockedHours();
    }, []);
    
        const update = async () => {
            await getSolicitudes();
            await getBlockedHours();
        };



    const columns = [
        {
            accessorKey: "fecha_cita",
            header: "Fecha de la cita",
        },
        {
            accessorKey: "hora_cita",
            header: "Hora de la cita",
        },
        {
            accessorKey: "paciente",
            header: "Paciente",
        },
        {
            accessorKey: "tipo_mascota",
            header: "Tipo de mascota",
        },
        {
            accessorKey: "propietario",
            header: "Propietario",
        },
        {
            accessorKey: "cedula",
            header: "Cedula",
        },
        {
            accessorKey: "correo",
            header: "Correo",
        },
        {
            accessorKey: "telefono",
            header: "Telefono",
        },
        {
            accessorKey: "direccion",
            header: "Direccion",
        },
        {
            accessorKey: "tipo_cliente",
            header: "Tipo de cliente",
        },
        {
            accessorKey: "servicio",
            header: "Servicio",
        },
        {
            accessorKey: "forma_pago",
            header: "Forma de pago",
        },
        {
            accessorKey: "created_at",
            header: "Fecha de creacion",
        },
        {
            accessorKey: "edit",
            header: "Imprimir",
            Cell: ({ row }) => <EditSolic2 solicitud={row.original} />,
        },
        {
            accessorKey: "delete",
            header: "Delete",
            Cell: ({ row }) => <button onClick={() => deleteSolicitud(row.original.id_solic)} className='btn btn-danger'>Delete</button>
        },
    ];
    
    return (
        <Fragment >

            <button onClick={
                () => {
                    getSolicitudes();
                    getBlockedHours();
                }
            }>Refreshwe</button>
            <h2 style={{ textAlign: 'center' }}>Lista de Solicitudes</h2>
            <MaterialReactTable
                columns={columns}
                data={solicitudes}
            ></MaterialReactTable>
           
                {/* <p>Contenido para el manejo de las horas</p>
                {["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"].map(hour => (
                    <label key={hour} className="checkbox-label">
                        <input
                            className="checkbox"
                            type="checkbox"
                            checked={blockedHours.includes(hour)}
                            onChange={() => toggleHour(hour)}
                        />
                        <span>{hour}</span>
                    </label>
                ))} */}

                


        </Fragment>
    );
}

export default ListSolicitudes;