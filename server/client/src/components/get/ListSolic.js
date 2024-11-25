import React, { Fragment, useEffect, useState, useMemo, useCallback } from 'react';
import { MaterialReactTable } from 'material-react-table';
import EditSolic2 from '../editSolic/editSolic2';
import './ListSolic.css';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import DeleteIcon from '@mui/icons-material/Delete';

const POLLING_INTERVAL = 2000;

const ListSolicitudes = () => {
    const [solicitudes, setSolicitudes] = useState([]);
    const [blockedHours, setBlockedHours] = useState([]);
    const [error, setError] = useState(null);

    // Memoizar funciones
    const deleteSolicitud = useCallback(async (id) => {
        if (!window.confirm('¿Está seguro de eliminar esta solicitud?')) {
            return;
        }
        try {
            const response = await fetch(`http://localhost:5000/solicitudes/${id}`, {
                method: "DELETE",
                credentials: 'include'
            });
            
            if (!response.ok) throw new Error('Error al eliminar');
            
            setSolicitudes(prev => prev.filter(solicitud => solicitud.id_solic !== id));
        } catch (err) {
            setError(err.message);
        }
    }, []);

    const getSolicitudes = useCallback(async () => {
        try {
            const response = await fetch("http://localhost:5000/solicitudes", {
                method: "GET",
                credentials: 'include',
                headers: { "Content-Type": "application/json" }
            });
    
            if (!response.ok) throw new Error('Error al cargar datos');
            
            const jsonData = await response.json();
            setSolicitudes(prev => {
                return JSON.stringify(prev) !== JSON.stringify(jsonData) ? jsonData : prev;
            });
            setError(null);
        } catch (err) {
            setError(err.message);
        }
    }, []);

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

        const interval = setInterval(() => {
            getSolicitudes();
            getBlockedHours();
        }, POLLING_INTERVAL);

        return () => clearInterval(interval);
    }, [getSolicitudes, getBlockedHours]);

    // Memoizar columns
    const columns = useMemo(() => [
        {
            accessorKey: "fecha_cita",
            header: "Fecha Cita",
            Cell: ({ cell }) => {
                const date = new Date(cell.getValue());
                return date.toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                });
            },
            size:160,
        },
        {
            accessorKey: "hora_cita",
            header: "Hora",
            Cell: ({ cell }) => {
                const [hours, minutes] = cell.getValue().split(':');
                const hour = parseInt(hours);
                const ampm = hour >= 12 ? 'PM' : 'AM';
                const hour12 = hour % 12 || 12;
                return `${hour12}:${minutes} ${ampm}`;
            },
            size:100,
            enableColumnActions: false,
        },
        {
            accessorKey: "paciente",
            header: "Paciente",
            enableSorting: false,
            enableColumnActions:false,
            size:160,
        },
        {
            accessorKey: "tipo_mascota",
            header: "Tipo/Mascota",
        },
        // Agregar nueva columna para el doctor
        {
            accessorKey: "nombre_doctor", // Este debe coincidir con el nombre del campo en la base de datos
            header: "Doctor",
            enableSorting: true,
            size: 160,
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
            Cell: ({ cell }) => {
                const date = new Date(cell.getValue());
                return date.toLocaleString('es-ES', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                    timeZone: 'America/Bogota' // Adjust this to your timezone
                });
            }
        },
        {
            accessorKey: "edit",
            header: "Imprimir",
            Cell: ({ row }) => <EditSolic2 solicitud={row.original} />,
            enableColumnPinning: true,

        },
        {
            accessorKey: "delete",
            header: "Borrar",
            size: 80, 
            enableSorting: false,
            enableColumnActions:false,
            
            Cell: ({ row }) => <button onClick={() => deleteSolicitud(row.original.id_solic)} className='btn btn-danger'><DeleteIcon></DeleteIcon></button>
        },
    ], [deleteSolicitud]); // Dependencia necesaria para el botón delete

    // Memoizar acciones de la tabla
    const renderTopToolbarCustomActions = useCallback(() => (
        <div className="headerTable">
            <label className="tableTitle">
                Solicitudes
            </label>
            {error && (
                <small style={{color: 'red', marginLeft: '10px'}}>
                    {error}
                </small>
            )}
        </div>
    ), [error]);

    return (
        <div style={{ padding: "20px" }}>
            <MaterialReactTable
                columns={columns}
                data={solicitudes}
                renderTopToolbarCustomActions={renderTopToolbarCustomActions}
                muiTablePaperProps={{
                    elevation: 0,
                    sx: {
                        borderRadius: '0.5rem',
                        border: '1px solid #e0e0e0',
                    },
                }}
                enableColumnResizing
                enablePagination
                enableColumnFilters
                enableGlobalFilter
                localization={MRT_Localization_ES}
                initialState={{
                    columnPinning: { left: ['fecha_cita'], right: ['delete'] }
                }}
            />
        </div>
    );
};

export default ListSolicitudes;