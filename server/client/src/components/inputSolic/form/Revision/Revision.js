import React, { useState } from 'react';
import './Revision.css';
import logo from '../../../../media/profile.jpg';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import html2pdf from 'html2pdf.js';

function Revision({ formData }) {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const { paciente, servicio, contacto } = formData;

  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    }).replace(/\//g, '/');
  };

  const formatTime = (time) => {
    if (!time) return '';
    const [hour, minute] = time.split(':');
    const d = new Date();
    d.setHours(hour);
    d.setMinutes(minute);
    return d.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).toLowerCase();
  };

  const handleClose = () => {
    setOpenModal(false);
    navigate('/');
  };

  const generatePDF = () => {
    const element = document.getElementById('appointment-content');
    // Hide buttons before generating PDF
    const buttons = element.getElementsByClassName('button-container');
    for (let button of buttons) {
      button.style.display = 'none';
    }
    
    const opt = {
      margin: 1,
      filename: 'cita-veterinaria.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    
    html2pdf().set(opt).from(element).save().then(() => {
      // Restore buttons after PDF generation
      for (let button of buttons) {
        button.style.display = 'flex';
      }
    });
  };

  const handleSubmit = async () => {
    try {
      // Create date and subtract 5 hours
      const now = new Date();
      now.setHours(now.getHours() - 5);
      
      const formattedData = {
        selectedDoctor: servicio.doctor,
        startDate: servicio.fecha_cita,
        hora_cita: servicio.hora_cita,
        paciente: paciente.mascota,
        tipo_mascota: paciente.tipoMascota,
        propietario: paciente.propietario,
        cedula: paciente.cedula,
        correo: contacto.correo,
        telefono: contacto.telefono,
        direccion: contacto.direccion,
        tipo_cliente: servicio.tipo_cliente,
        servicio: servicio.tipoServicio,
        forma_pago: "N/A",
        created_at: now.toISOString() // Send adjusted time
      };

      const response = await fetch("http://localhost:5000/solicitudes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData)
      });

      if (response.ok) {
        setOpenModal(true);
      }
    } catch (error) {
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="mainReporte">
      <div className="appointment-card" id="appointment-content">
        <div className="clinic-header">
          <img 
            src={logo}
            alt="Clínica Logo" 
            className="clinic-logo"
          />
          <div className="clinic-info">
            <h1 className="clinic-title">Clínica Veterinaria UDES</h1>
            <div>Bucaramanga, Colombia</div>
            <div>Tel: (123) 456-7890</div>
            <div>Email: clinica@udes.edu.co</div>
          </div>
        </div>

        <div className="appointment-details">
          <h2 className="section-title">Comprobante de Cita</h2>
          <p className="emission-date">Fecha de emisión: {new Date().toLocaleDateString('es-ES')}</p>

          <div className="appointment-info">
            <div className="info-item">
              <span className="info-label">Propietario:</span>
              <span>{paciente.propietario}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Cédula:</span>
              <span>{paciente.cedula}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Paciente:</span>
              <span>{paciente.mascota}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Tipo:</span>
              <span>{paciente.tipoMascota}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Doctor:</span>
              <span>{servicio.doctor}</span>
            </div>
            <div className="info-item date-time">
              <span className="info-label">Fecha de cita:</span>
              <span>
                {formatDate(servicio.fecha_cita)} - {formatTime(servicio.hora_cita)}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Servicio:</span>
              <span>{servicio.tipoServicio}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Tipo de cliente:</span>
              <span>{servicio.tipo_cliente}</span>
            </div>
          </div>

          <h3 className="section-title">Información de contacto</h3>
          <div className="contact-info">
            <div className="info-item">
              <span className="info-label">Dirección:</span>
              <span>{contacto.direccion}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Teléfono:</span>
              <span>{contacto.telefono}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Email:</span>
              <span>{contacto.correo}</span>
            </div>
          </div>

          <div className="button-container">
            <button className="enviar" onClick={handleSubmit}>
              Enviar Solicitud
            </button>
          </div>
        </div>
      </div>

      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="success-modal"
      >
        <Box className="success-modal">
          <h2>¡Solicitud realizada exitosamente!</h2>
          <div className="modal-buttons">
            <button onClick={generatePDF} className="download-btn">
              Descargar Cita
            </button>
            <button onClick={handleClose} className="done-btn">
              Listo
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default Revision;
