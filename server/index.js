import express from "express";
import cors from "cors";
import pool from "./db.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN, 
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"],
  })
);
app.use(express.json());
app.use(cookieParser());

app.use('/media/profile', express.static('./client/src/media/profile'));

app.use((req, res, next) => {
  const token = req.cookies.access_token;
  req.session = { user: null };

  if (token) {
    try {
      const data = jwt.verify(token, SECRET_JWT_KEY);
      req.session.user = data;
    } catch (error) {
      // Token inválido - limpiar cookie
      res.clearCookie("access_token");
    }
  }
  next();
});

const SECRET_JWT_KEY = process.env.JWT_SECRET || "secret";
// Routes

import crypto from "crypto";
import bcrypt from "bcrypt";
// import { SALT_ROUNDS } from "./config.js";
class validation {
  static username(username) {
    if (typeof username !== "string")
      throw new Error("username must be a string");
    if (username.length < 3)
      throw new Error("username must be at least 3 characters long");
    if (username.length > 40)
      throw new Error("username must be at most 20 characters long");
  }
  static password(password) {
    if (typeof password !== "string")
      throw new Error("password must be a string");
    if (password.length < 3)
      throw new Error("password must be at least 3 characters long");
    if (!/[A-Z]/.test(password))
      throw new Error("password must contain uppercase letter");
    if (!/[0-9]/.test(password))
      throw new Error("password must contain number");
  }
  static nombre(nombre) {
    if (typeof nombre !== "string") throw new Error("nombre must be a string");
    if (nombre.length < 2)
      throw new Error("nombre must be at least 2 characters long");
    if (nombre.length > 50)
      throw new Error("nombre must be at most 50 characters long");
  }

  static rol(rol) {
    const validRoles = ["admin", "user"];
    if (!validRoles.includes(rol)) throw new Error("invalid rol");
  }
}

export class UserRepository {
  static async create({ username, password, nombre, rol, photo }) {

    validation.username(username);
    validation.password(password);
    validation.nombre(nombre);
    validation.rol(rol);

    const id = crypto.randomUUID();
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const newUser = await pool.query(
        "INSERT INTO users (_id, username, password, nombre, rol, photo) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [id, username, hashedPassword, nombre, rol, photo]
      );

      return newUser.rows[0];
    } catch (err) {
      console.error("Database error:", err); // Debug log
      throw err;
    }
  }
  static async login({ username, password }) {
    // 1. Validate input
    validation.username(username);
    validation.password(password);

    // 2. Check if username exists
    const user = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);

    if (user.rows.length === 0) {
      throw new Error("User not found");
    }

    // 3. Check password
    const passwordMatch = await bcrypt.compare(password, user.rows[0].password);

    if (!passwordMatch) {
      throw new Error("Incorrect password");
    }

    return user.rows[0];
  }
}

const verifyToken = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ error: "Access denied. Not authenticated." });
  }
  next();
};

////////////////////////////
/* Registrar usuarios*/

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./client/src/media/profile");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
  },
});

app.post("/register", verifyToken, upload.single("photo"), async (req, res) => {
  const { username, password, nombre, rol } = req.body;
  const photoFilename = req.file ? req.file.filename : "default.jpg";

  // Input validation
  if (!username || !password || !nombre || !rol) {
    return res.status(400).json({
      error: "Missing required fields",
    });
  }

  try {
    const user = await UserRepository.create({
      username,
      password,
      nombre,
      rol,
      photo: photoFilename,
    });
    return res.status(201).json({
      id: user._id,
      username: user.username,
      nombre: user.nombre,
      rol: user.rol,
      photo: user.photo,

      // Don't send back password hash
    });
  } catch (error) {
    console.error("Error details:", error); // Debug log
    // Handle specific error types
    if (error.message === "username already exists") {
      return res.status(409).json({
        error: "Username already taken",
      });
    }

    // Log unexpected errors
    console.error("Registration error:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
});
// index.js
app.get("/users", verifyToken, async (req, res) => {
  try {
    const users = await pool.query(
      "SELECT _id, username, nombre, rol, photo FROM users"
    );
    res.json(users.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.delete("/users/:id", verifyToken, async (req, res) => {
  try {
    await pool.query("DELETE FROM users WHERE _id = $1", [req.params.id]);
    res.json({ message: "Usuario eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const user = await UserRepository.login({ username, password });

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      SECRET_JWT_KEY,
      { expiresIn: "7d" }
    );

    // Set cookie
    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      })
      .send({ user });

    // return res.status(200).json({
    //     id: user._id,
    //     username: user.username
    // });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Internal server error" });
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
    res.status(500).json({ error: "Internal server error" });
  }
});

//get a solicitud
/*
 */
app.get("/solicitudes/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const solicitud = await pool.query(
      "SELECT * FROM solicitudes WHERE id_solic = $1",
      [id]
    );
    res.json(solicitud.rows[0]);
  } catch (error) {
  }
});

//create a solicitud
app.post("/solicitudes", async (req, res) => {
  try {
    const {
      selectedDoctor,
      startDate,
      hora_cita,
      paciente,
      tipo_mascota,
      propietario,
      cedula,
      correo,
      telefono,
      direccion,
      tipo_cliente,
      servicio,
      forma_pago,
      created_at,
    } = req.body;
    const newSolic = await pool.query(
      "INSERT INTO solicitudes (fecha_cita, hora_cita, paciente, tipo_mascota, propietario, cedula, correo, telefono, direccion, tipo_cliente, servicio, forma_pago, created_at, nombre_doctor) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *",
      [
        startDate,
        hora_cita,
        paciente,
        tipo_mascota,
        propietario,
        cedula,
        correo,
        telefono,
        direccion,
        tipo_cliente,
        servicio,
        forma_pago,
        created_at,
        selectedDoctor,
      ]
    );
    res.json(newSolic.rows[0]);
  } catch (error) {
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
    const {
      fecha_cita,
      hora_cita,
      paciente,
      tipo_mascota,
      propietario,
      cedula,
      correo,
      telefono,
      direccion,
      tipo_cliente,
      servicio,
      forma_pago,
      created_at,
    } = req.body;
    const updateSolic = await pool.query(
      "UPDATE solicitudes SET fecha_cita = $1, hora_cita = $2, paciente = $3, tipo_mascota = $4, propietario = $5, cedula = $6, correo = $7, telefono = $8, direccion = $9, tipo_cliente = $10, servicio = $11, forma_pago = $12, created_at = $13 WHERE id_solic = $14 RETURNING *",
      [
        fecha_cita,
        hora_cita,
        paciente,
        tipo_mascota,
        propietario,
        cedula,
        correo,
        telefono,
        direccion,
        tipo_cliente,
        servicio,
        forma_pago,
        created_at,
        id,
      ]
    );
    res.json("Solicitud fue actualizada");
  } catch (error) {
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
    await pool.query("DELETE FROM solicitudes WHERE id_solic=$1", [id]);
    res.status(200).json({ message: "Solicitud fue eliminada" });
  } catch (error) {
  }
});

//get all doctors
app.get("/doctores", async (req, res) => {
  try {
    const allDoctors = await pool.query("SELECT * FROM doctores");
    res.json(allDoctors.rows);
  } catch (error) {
  }
});

//get a doctor

//create a doctor

app.post("/doctores", verifyToken, async (req, res) => {
  try {
    const { cedulaCiudadania, nombreDoctor, numeroTelefono, especialidad } =
      req.body;
    const newDoctor = await pool.query(
      "INSERT INTO doctores (nombre_doctor, numero_telefono, cedula_ciudadania, id_horario, especialidad) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [nombreDoctor, numeroTelefono, cedulaCiudadania, 1, especialidad]
    );
    res.json(newDoctor.rows[0]);
  } catch (error) {
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
    await pool.query("DELETE FROM doctores WHERE id_doctor=$1", [id]);
    res.status(200).json({ message: "Solicitud fue eliminada" });
  } catch (error) {
  }
});

app.put("/doctores/:id/toggle", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { activo } = req.body;
    
    await pool.query(
      "UPDATE doctores SET activo = $1 WHERE id_doctor = $2",
      [activo, id]
    );
    
    res.json({ message: "Estado del doctor actualizado" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar estado del doctor" });
  }
});

//get all horarios
app.get("/horarios/", async (req, res) => {
  try {
    const { id } = req.params;
    const horarios = await pool.query("SELECT * FROM horarios");
    res.json(horarios.rows);
  } catch (error) {
  }
});

//get a horario
app.get("/horario/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const horarios = await pool.query(
      "SELECT * FROM horarios WHERE id_doctor = $1",
      [id]
    );
    res.json(horarios.rows);
  } catch (error) {
 }
});
/*KIKE 



*/
//create, update and delete a horario (formulario de horario en /doctors)
app.post("/horario", async (req, res) => {
  try {
    const { id_doctor, horarios } = req.body;

    // Validación inicial
    if (!id_doctor || !Array.isArray(horarios)) {
      return res.status(400).json({ error: "Datos inválidos" });
    }

    // Obtener días seleccionados
    const selectedDays = horarios.map((h) => h.dia_semana);

    // Actualizar horarios en una transacción
    await pool.query("BEGIN");

    try {
      // Primero eliminar todos los horarios existentes
      await pool.query("DELETE FROM horarios WHERE id_doctor = $1", [
        id_doctor,
      ]);

      // Insertar los nuevos horarios
      for (const horario of horarios) {
        const { dia_semana, hora_inicio, hora_final } = horario;

        await pool.query(
          `INSERT INTO horarios (id_doctor, dia_semana, hora_inicio, hora_final) 
           VALUES ($1, $2, $3, $4)`,
          [id_doctor, dia_semana, hora_inicio, hora_final]
        );
      }

      await pool.query("COMMIT");
      res.json({ message: "Horarios actualizados correctamente" });
    } catch (err) {
      await pool.query("ROLLBACK");
      throw err;
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al actualizar horarios" });
  }
});

// index.js
app.get("/verify", (req, res) => {
  if (req.session.user) {
    pool.query(
      "SELECT nombre, rol, photo FROM users WHERE _id = $1",
      [req.session.user.id],
      (error, results) => {
        if (error) {
          return res.status(500).json({ error: "Database error" });
        }

        const userData = results.rows[0];
        res.status(200).json({
          isAuthenticated: true,
          user: {
            ...userData,
          },
        });
      }
    );
  } else {
    res.status(401).json({ isAuthenticated: false });
  }
});

app.post("/logout", (req, res) => {
  try {
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return res.status(200).json({ message: "Sesión cerrada exitosamente" });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ error: "Error al cerrar sesión" });
  }
});

app.get("/citas-agendadas/:doctorId/:fecha", async (req, res) => {
  try {
    const { doctorId, fecha } = req.params;
    const citasAgendadas = await pool.query(
      "SELECT hora_cita FROM solicitudes WHERE nombre_doctor = $1 AND fecha_cita = $2",
      [doctorId, fecha]
    );
    res.json(citasAgendadas.rows.map(cita => cita.hora_cita));
  } catch (error) {
    res.status(500).json({ error: "Error getting booked appointments" });
  }
});

app.listen(5000, () => {
});
