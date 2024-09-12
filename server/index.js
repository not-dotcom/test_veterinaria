import express from 'express';
import cors from 'cors';
import pool from './db.js';
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// Routes

//get all solicitudes
app.get("/solicitudes", async (req, res) => {
    try {
        const allSolicitudes = await pool.query("SELECT * FROM solicitudes");
        res.json(allSolicitudes.rows);
    } catch (error) {
        console.log(error.message);

    }
});

//get a solicitud
app.get("/solicitudes/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const solicitud = await pool.query("SELECT * FROM solicitudes WHERE id_solic = $1", [id]);
        res.json(solicitud.rows[0]);
    } catch (error) {
        console.log(error.message);

    }
});

//create a solicitud
app.post("/solicitudes", async (req, res) => {
    try {
        const { nombre_doctor, fecha_cita, hora_cita, paciente, tipo_mascota, propietario, cedula, correo, telefono, direccion, tipo_cliente, servicio, forma_pago, created_at } = req.body;
        const newSolic = await pool.query("INSERT INTO solicitudes (fecha_cita, hora_cita, paciente, tipo_mascota, propietario, cedula, correo, telefono, direccion, tipo_cliente, servicio, forma_pago, created_at, nombre_doctor) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *",
            [fecha_cita, hora_cita, paciente, tipo_mascota, propietario, cedula, correo, telefono, direccion, tipo_cliente, servicio, forma_pago, created_at, nombre_doctor]);
        res.json(newSolic.rows[0]);

    } catch (error) {
        console.log(error.message);

    }
});

//update a solicitud
app.put("/solicitudes/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { fecha_cita, hora_cita, paciente, tipo_mascota, propietario, cedula, correo, telefono, direccion, tipo_cliente, servicio, forma_pago, created_at } = req.body;
        const updateSolic = await pool.query("UPDATE solicitudes SET fecha_cita = $1, hora_cita = $2, paciente = $3, tipo_mascota = $4, propietario = $5, cedula = $6, correo = $7, telefono = $8, direccion = $9, tipo_cliente = $10, servicio = $11, forma_pago = $12, created_at = $13 WHERE id_solic = $14 RETURNING *", [fecha_cita, hora_cita, paciente, tipo_mascota, propietario, cedula, correo, telefono, direccion, tipo_cliente, servicio, forma_pago, created_at, id]);
        res.json("Solicitud fue actualizada");
    } catch (error) {
        console.log(error.message);

    }
});

//delete a solicitud
app.delete("/solicitudes/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM solicitudes WHERE id_solic=$1", [
            id
        ]);
        console.log(id);
        res
            .status(200)
            .json({ message: "Solicitud fue eliminada" });
    } catch (error) {
        console.log(error.message);

    }
});

//get all doctors
app.get("/doctores", async (req, res) => {
    try {
        const allDoctors = await pool.query("SELECT * FROM doctores");
        res.json(allDoctors.rows);
    } catch (error) {
        console.log(error.message);

    }
});

//get a doctor

//create a doctor
app.post("/doctores", async (req, res) => {
    try {
        const { cedulaCiudadania, nombreDoctor, numeroTelefono, especialidad } = req.body;
        const newDoctor = await pool.query("INSERT INTO doctores (nombre_doctor, numero_telefono, cedula_ciudadania, id_horario, especialidad) VALUES($1, $2, $3, $4, $5) RETURNING *",
            [nombreDoctor, numeroTelefono, cedulaCiudadania, 1, especialidad]);
        res.json(newDoctor.rows[0]);

    } catch (error) {
        console.log(error.message);

    }
});

//delete a doctor
app.delete("/doctores/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM doctores WHERE id_doctor=$1", [
            id
        ]);
        console.log(id);
        res
            .status(200)
            .json({ message: "Solicitud fue eliminada" });
    } catch (error) {
        console.log(error.message);

    }
});

//get a horario
app.get("/horario/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const horarios = await pool.query("SELECT * FROM horarios WHERE id_doctor = $1", [
            id
        ]);
        res.json(horarios.rows);
    } catch (error) {
        console.log(error.message);

    }
});

//create, update and delete a horario (formulario de horario en /doctors)
app.post("/horario", async (req, res) => {
    try {
        const { id_doctor, horarios } = req.body;

        if (!id_doctor || !Array.isArray(horarios)) {
            return res.status(400).json({ error: 'falta el id_doctor y el array de horarios.' });
        }

        const selectedDays = horarios.map(h => h.dia_semana);

        //Insertar o actualizar horarios
        for (let i = 0; i < horarios.length; i++) {
            const { dia_semana, hora_inicio, hora_final } = horarios[i];

            if (!dia_semana || !hora_inicio || !hora_final) {
                return res.status(400).json({ error: 'Todos los horarios deben tener día, hora de inicio y hora de fin.' });
            }

            // Verificar si ya existe un horario para este doctor y día de la semana
            const existingHorario = await pool.query(
                'SELECT * FROM horarios WHERE id_doctor = $1 AND dia_semana = $2',
                [id_doctor, dia_semana]
            );

            if (existingHorario.rows.length > 0) {
                // Si existe un horario, hacemos un UPDATE
                await pool.query(
                    'UPDATE horarios SET hora_inicio = $1, hora_final = $2 WHERE id_doctor = $3 AND dia_semana = $4',
                    [hora_inicio, hora_final, id_doctor, dia_semana]
                );
            } else {
                // Si no existe, hacemos un INSERT
                await pool.query(
                    'INSERT INTO horarios (id_doctor, dia_semana, hora_inicio, hora_final) VALUES ($1, $2, $3, $4)',
                    [id_doctor, dia_semana, hora_inicio, hora_final]
                );
            }
        }

        //Eliminar horarios no seleccionados
        //Seleccionar todos los días almacenados en la BD para este doctor
        const horariosExistentes = await pool.query(
            'SELECT dia_semana FROM horarios WHERE id_doctor = $1',
            [id_doctor]
        );

        // Filtrar los días que ya no están en el array 'selectedDays' (días desmarcados)
        const diasParaEliminar = horariosExistentes.rows
            .map(row => row.dia_semana)
            .filter(dia => !selectedDays.includes(dia));

        // Eliminar los horarios que ya no están seleccionados
        if (diasParaEliminar.length > 0) {
            await pool.query(
                'DELETE FROM horarios WHERE id_doctor = $1 AND dia_semana = ANY($2::text[])',
                [id_doctor, diasParaEliminar]
            );
        }

        //menaje con éxito
        res.status(200).json({ message: 'Horarios actualizados correctamente.' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Hubo un error al actualizar los horarios.' });
    }
});

app.listen(5000, () => {
    console.log("Server has started on port 5000");
});