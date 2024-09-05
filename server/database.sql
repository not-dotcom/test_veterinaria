
CREATE TABLE solicitudes (
    id_solic SERIAL PRIMARY KEY,
    fecha_cita DATE NOT NULL,
    hora_cita TIME NOT NULL,
    paciente VARCHAR(255) NOT NULL,
    tipo_mascota VARCHAR(255) NOT NULL,
    propietario VARCHAR(255) NOT NULL,
    cedula INT NOT NULL,
    correo VARCHAR(255) NOT NULL,
    telefono INT NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    tipo_cliente VARCHAR(255) NOT NULL,
    servicio VARCHAR(255) NOT NULL,
    forma_pago VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);