import React, { useEffect, useState, useMemo, useCallback } from "react";
import { MaterialReactTable } from "material-react-table";
import DeleteIcon from '@mui/icons-material/Delete';
import Header from "../header/header";
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { API_URL } from "../../config";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const getUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/users`, {
        // href={`${FRONTEND_URL}/user`}
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
        size: 80,
        enableSorting: false,
        enableColumnActions: false,
        Cell: ({ row }) => (
          <button 
            onClick={() => handleDelete(row.original._id)} 
            className="btn btn-danger"
          >
            <DeleteIcon />
          </button>
        ),
      },
    ],
    []
  );

  const handleDelete = useCallback(async (id) => {
    if (!window.confirm("¿Está seguro de eliminar este usuario?")) {
      return;
    }
    try {
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) throw new Error("Error al eliminar usuario");

      setUsers((prev) => prev.filter((user) => user._id !== id));
    } catch (err) {
      setError(err.message);
    }
  }, []);
  const renderTopToolbarCustomActions = useCallback(() => (
    <div className="headerTable">
        <label className="tableTitle">
            Usuarios
        </label>
        {error && (
            <small style={{color: 'red', marginLeft: '10px'}}>
                {error}
            </small>
        )}
    </div>
), [error]);

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
          renderTopToolbarCustomActions={renderTopToolbarCustomActions}
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
