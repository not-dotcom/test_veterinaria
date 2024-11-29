import React, { Fragment, useState, useEffect } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Button, Modal, Box, Typography } from "@mui/material";
import "./InputDoctor.css";
import Horarios from "../horarios/horarios";
import HorarioDoctor from "../horarioDoctor/HorarioDoctor";
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import DeleteIcon from '@mui/icons-material/Delete';
import { API_URL } from "../../config";

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
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 550,
    bgcolor: "background.paper",
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
  };

  const getDoctores = async () => {
    try {
      const response = await fetch(`${API_URL}/doctores`, {
        method: "GET",
        credentials: "include", // Añade esta línea
        headers: {
          "Content-Type": "application/json",
        },
      });
      const jsonData = await response.json();
      setDoctores(jsonData);
    } catch (err) {
    }
  };

  const deleteDoctor = async (id) => {
    try {
      const response = await fetch(`${API_URL}/doctores/${id}`, {
        method: "DELETE",
        credentials: "include", // Añade esta línea
      });
      // Optionally, remove the deleted solicitud from the state
      setDoctores(doctores.filter((doctor) => doctor.id_doctor !== id));
    } catch (err) {
    }
  };

  const toggleDoctorStatus = async (id, currentStatus) => {
    try {
      const response = await fetch(`${API_URL}/doctores/${id}/toggle`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ activo: !currentStatus })
      });
  
      if (response.ok) {
        // Actualiza el estado local
        setDoctores(doctores.map(doctor => 
          doctor.id_doctor === id 
            ? {...doctor, activo: !doctor.activo}
            : doctor
        ));
      }
    } catch (err) {
      console.error(err.message);
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
    // {
    //   accessorKey: "horarios",
    //   header: "Ver horario",
    //   Cell: ({ row }) => <HorarioDoctor doctor={row.original} />,
    // },
    {
      accessorKey: "delete",
      header: "Eliminar",
      size: 80,
      enableSorting: false,
      enableColumnActions: false,
      Cell: ({ row }) => (
        <button
          onClick={() => deleteDoctor(row.original.id_doctor)}
          className="btn btn-danger"
        >
          <DeleteIcon />
        </button>
      ),
    },
    {
      accessorKey: "estado",
      header: "Estado",
      Cell: ({ row }) => (
        <button 
          onClick={() => toggleDoctorStatus(row.original.id_doctor, row.original.activo)}
          className={`btn ${row.original.activo ? 'btn-danger' : 'btn-success'}`}
        >
          {row.original.activo ? 'Deshabilitar' : 'Habilitar'}
        </button>
      ),
    }
    
  ];

  const onsubmitform = async (e) => {
    e.preventDefault();
    try {
      const body = {
        cedulaCiudadania,
        nombreDoctor,
        numeroTelefono,
        especialidad,
      };
      const response = await fetch(`${API_URL}/doctores`, {
        method: "POST",
        credentials: "include", // Añade esta línea
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      window.location = "/doctors";
    } catch (error) {
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <MaterialReactTable
        /*Aqui van los valSSores de las tablas de doctores*/
        columns={columnsDoctores}
        data={doctores}
        enableRowSelection={false}
        renderTopToolbarCustomActions={() => (
          <div className="headerTable">
            <label className="tableTitle">Doctores</label>
            <button onClick={handleOpen} className="btn btn-secondary">
              Agregar
            </button>
          </div>
        )}
        muiTopToolbarProps={{
          style: {
            display: "flex",
          },
        }}
        localization={MRT_Localization_ES}

      ></MaterialReactTable>

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
              <input
                type="text"
                className="form-control"
                value={nombreDoctor}
                onChange={(e) => setNombreDoctor(e.target.value)}
              ></input>
              <label>Cedula de ciudadania</label>
              <input
                type="text"
                className="form-control"
                value={cedulaCiudadania}
                onChange={(e) => setCedulaCiudadania(e.target.value)}
              ></input>
              <label>Especialidad</label>
              <input
                type="text"
                className="form-control"
                value={especialidad}
                onChange={(e) => setEspecialidad(e.target.value)}
              ></input>
              <label>Numero de telefono</label>
              <input
                type="number"
                className="form-control"
                value={numeroTelefono}
                onChange={(e) => setNumeroTelefono(e.target.value)}
              ></input>
              <br></br>
              <div className="button-container">
                <button type="submit" className="btn btn-primary">
                  Agregar
                </button>
              </div>
            </form>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default InputDoctor;
