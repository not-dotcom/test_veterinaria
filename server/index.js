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

app.listen(5000, () => {
    console.log("Server has started on port 5000");
});