import express from 'express';
import cors from 'cors';
import pool from './db.js';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();


// middleware
// notificaciones de nuevas solicitudes mediante correo
app.use(cors({
    origin: "http://localhost:3000", // URL de tu frontend
    credentials: true, // Importante para cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token'],
}));
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
    const token = req.cookies.access_token;
    req.session = { user: null };
    
    if (token) {
        try {
            const data = jwt.verify(token, SECRET_JWT_KEY);
            req.session.user = data;
        } catch (error) {
            // Token inválido - limpiar cookie
            res.clearCookie('access_token');
        }
    }
    next();
});

const SECRET_JWT_KEY = process.env.JWT_SECRET || 'secret';
// Routes


import crypto from "crypto";
import bcrypt from "bcrypt";
// import { SALT_ROUNDS } from "./config.js";
class validation{
    static username(username){
        if (typeof username !== 'string') throw new Error('username must be a string')
        if (username.length < 3) throw new Error('username must be at least 3 characters long')
        if (username.length > 40) throw new Error('username must be at most 20 characters long')
    }
    static password(password){
        if (typeof password !== 'string') throw new Error('password must be a string')
        if (password.length < 3) throw new Error('password must be at least 3 characters long')
        if (!/[A-Z]/.test(password)) throw new Error('password must contain uppercase letter')
        if (!/[0-9]/.test(password)) throw new Error('password must contain number')
    }
}
 

export class UserRepository {
    static async create({username, password}) {
        // 1. Validate input
        validation.username(username);
        validation.password(password);

        // 2. Check if username exists
        const existingUser = await pool.query(
            "SELECT * FROM users WHERE username = $1",
            [username]
        );

        if (existingUser.rows.length > 0) {
            throw new Error('username already exists');
        }

        // 3. Create new user
        const id = crypto.randomUUID();
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await pool.query(
            "INSERT INTO users (_id, username, password) VALUES ($1, $2, $3) RETURNING *",
            [id, username, hashedPassword]
        );

        return newUser.rows[0];
    }
    static async login({username, password}) {
        // 1. Validate input
        validation.username(username);
        validation.password(password);

        // 2. Check if username exists
        const user = await pool.query(
            "SELECT * FROM users WHERE username = $1",
            [username]
        );

        if (user.rows.length === 0) {
            throw new Error('User not found');
        }

        // 3. Check password
        const passwordMatch = await bcrypt.compare(password, user.rows[0].password);

        if (!passwordMatch) {
            throw new Error('Incorrect password');
        }

        return user.rows[0];
    }
}

const verifyToken = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).json({ error: 'Access denied. Not authenticated.' });
    }
    next();
};

////////////////////////////
/* Registrar usuarios*/

app.post('/register', verifyToken, async (req, res) => {
    const { username, password } = req.body;
    
    // Input validation
    if (!username || !password) {
        return res.status(400).json({
            error: 'Missing required fields'
        });
    }

    try {
        const user = await UserRepository.create({ username, password });
        
        return res.status(201).json({
            id: user._id,
            username: user.username,
            // Don't send back password hash
        });

    } catch (error) {
        // Handle specific error types
        if (error.message === 'username already exists') {
            return res.status(409).json({
                error: 'Username already taken'
            });
        }

        // Log unexpected errors
        console.error('Registration error:', error);
        
        return res.status(500).json({
            error: 'Internal server error'
        });
    }
});



app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const user = await UserRepository.login({ username, password });

        // Generate JWT token
        const token = jwt.sign(
            {
                id: user._id,
                username: user.username
            },
            SECRET_JWT_KEY,
            { expiresIn: '1h' }
        );

        // Set cookie
        res.cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60 // 1 hour
        })
        .send({user});

        // return res.status(200).json({
        //     id: user._id,
        //     username: user.username
        // });

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
//////////////////////////

// Apply to routes that need protection
// app.use('/solicitudes', verifyToken);

//get all solicitudes

app.get("/solicitudes", verifyToken, async (req, res) => {
    try {
        const allSolicitudes = await pool.query("SELECT * FROM solicitudes");
        res.json(allSolicitudes.rows);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        console.log(error.message);
    }
});

//get a solicitud
/*
*/
app.get("/solicitudes/:id", verifyToken, async (req, res) => {
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
        const { selectedDoctor, startDate, hora_cita, paciente, tipo_mascota, propietario, cedula, correo, telefono, direccion, tipo_cliente, servicio, forma_pago, created_at } = req.body;
        console.log(startDate);
        const newSolic = await pool.query("INSERT INTO solicitudes (fecha_cita, hora_cita, paciente, tipo_mascota, propietario, cedula, correo, telefono, direccion, tipo_cliente, servicio, forma_pago, created_at, nombre_doctor) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *",
            [startDate, hora_cita, paciente, tipo_mascota, propietario, cedula, correo, telefono, direccion, tipo_cliente, servicio, forma_pago, created_at, selectedDoctor]);
        res.json(newSolic.rows[0]);

    } catch (error) {
        console.log(error.message);

    }
});

//update a solicitud
/*NECESITA AUTORIZACION
NECESITA AUTORIZACION
NECESITA AUTORIZACION
NECESITA AUTORIZACION
NECESITA AUTORIZACION
NECESITA AUTORIZACION*/
app.put("/solicitudes/:id", verifyToken, async (req, res) => {
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
/*NECESITA AUTORIZACION
Pero seria necesario modificar el endpoint de update
para que el ususario solo pueda modificar su estatus de cancelado

 */
app.delete("/solicitudes/:id", verifyToken, async (req, res) => {
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

app.post("/doctores", verifyToken, async (req, res) => {
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
/*NECESITA AUTORIZACION
NECESITA AUTORIZACION
NECESITA AUTORIZACION
NECESITA AUTORIZACION
NECESITA AUTORIZACION
NECESITA AUTORIZACION*/
app.delete("/doctores/:id", verifyToken, async (req, res) => {
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

//get all horarios
app.get("/horarios/", async (req, res) => {
    try {
        const { id } = req.params;
        const horarios = await pool.query("SELECT * FROM horarios");
        res.json(horarios.rows);
    } catch (error) {
        console.log(error.message);

    }
});

//get a horario
app.get("/horario/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const horarios = await pool.query("SELECT * FROM horarios WHERE id_doctor = $1", [
            id
        ]);
        console.log(horarios);
        res.json(horarios.rows);
    } catch (error) {
        console.log(error.message);

    }
});
/*KIKE 



*/
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

app.get('/verify', (req, res) => {
    if (req.session.user) {
        res.status(200).json({ isAuthenticated: true });
    } else {
        res.status(401).json({ isAuthenticated: false });
    }
});
app.post('/logout', (req, res) => {
    try {
        res.clearCookie('access_token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/'
        });
        
        return res.status(200).json({ message: 'Sesión cerrada exitosamente' });
    } catch (error) {
        console.error('Logout error:', error);
        return res.status(500).json({ error: 'Error al cerrar sesión' });
    }
});


app.listen(5000, () => {
    console.log("Server has started on port 5000");
});