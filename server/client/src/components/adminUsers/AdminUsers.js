import React, { useEffect, useState, useMemo, useCallback } from "react";
import { MaterialReactTable } from "material-react-table";
import { IconButton, Tooltip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import Header from "../header/header";
import { MRT_Localization_ES } from 'material-react-table/locales/es';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const getUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/users", {
        credentials: "include",
      });
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "username",
        header: "Usuario",
        grow: true,
      },
      {
        accessorKey: "nombre",
        header: "Nombre",
        grow: true,
      },
      {
        accessorKey: "rol",
        header: "Rol",
      },
      {
        accessorKey: "actions",
        header: "Acciones",
        Cell: ({ row }) => (
          <div>
            <Tooltip title="Editar">
              <IconButton onClick={() => handleEdit(row.original)}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar">
              <IconButton onClick={() => handleDelete(row.original._id)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </div>
        ),
      },
    ],
    []
  );

  const handleEdit = (user) => {
    // Add your edit logic here
    console.log("Edit user:", user);
  };

  const handleDelete = useCallback(async (id) => {
    if (!window.confirm("¿Está seguro de eliminar este usuario?")) {
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/users/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) throw new Error("Error al eliminar usuario");

      setUsers((prev) => prev.filter((user) => user._id !== id));
    } catch (err) {
      setError(err.message);
    }
  }, []);

  return (
    <div>
        <Header />
      <div style={{ padding: "20px" }}>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <MaterialReactTable
          columns={columns}
          data={users}
          enableColumnFilters
          enableColumnSorting
          enablePagination
          localization={MRT_Localization_ES}

          muiTableProps={{
            sx: {
              boxShadow: 3,
              borderRadius: 2,
            },
          }}
        />
      </div>
    </div>
  );
};

export default AdminUsers;
