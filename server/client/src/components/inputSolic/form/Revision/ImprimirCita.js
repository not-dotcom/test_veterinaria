import React from 'react';
import './ImprimirCita.css';

const ImprimirCita = ({ data }) => {
  return (
    <div className="print-container">
      <h2>Comprobante de Cita Médica Veterinaria</h2>
      <div className="cita-info">
        <p><strong>Fecha:</strong> {data.startDate}</p>
        <p><strong>Hora:</strong> {data.hora_cita}</p>
        <p><strong>Doctor:</strong> {data.selectedDoctor}</p>
        <p><strong>Paciente:</strong> {data.paciente}</p>
        <p><strong>Propietario:</strong> {data.propietario}</p>
        <p><strong>Teléfono:</strong> {data.telefono}</p>
        <p><strong>Servicio:</strong> {data.servicio}</p>
      </div>
    </div>
  );
};

export default ImprimirCita;