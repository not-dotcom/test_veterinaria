import React from 'react';
import './Revision.css';
function Revision({ formData }) {
  const { paciente, servicio, contacto } = formData;


  const formatDate = (date) => {
    if (!date) return '';
    if (typeof date === 'string') return date;
    return new Date(date).toLocaleDateString();
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
        window.location = "/user";
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="mainReporte" style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <div style={{ padding: '20px 20px 20px 20px', fontFamily: 'Arial, sans-serif', border: "3px solid #E8e8e8" }}>
        <div style={{ fontWeight: '600', fontSize: '24px', textAlign: 'center' }}>
          Clínica Veterinaria UDES - Bucaramanga
        </div>

        <div style={{ marginTop: '0px', textAlign: 'center', fontSize: '10px' }}>
          <div>{new Date().toLocaleDateString()}</div>
          <div style={{ fontWeight: '200', fontSize: "20px" }}>Cita agendada</div>
        </div>

        <div style={{ marginTop: '20px', fontSize: '16px', lineHeight: '1.8' }}>
          <div><strong>Nombre del propietario:</strong> {paciente.propietario}</div>
          <div><strong>Número de cédula:</strong> {paciente.cedula}</div>
          <div><strong>Nombre del paciente:</strong> {paciente.mascota}</div>
          <div><strong>Tipo de mascota:</strong> {paciente.tipoMascota || paciente.razaMascota}</div>
          <div><strong>Doctor:</strong> {servicio.doctor}</div>
          <div><strong>Cita agendada el día:</strong> {formatDate(servicio.fecha_cita)} a las {servicio.hora_cita}</div>
          <div><strong>Tipo de servicio:</strong> {servicio.tipoServicio}</div>
          <div><strong>Tipo de cliente:</strong> {servicio.tipo_cliente}</div>
          <div><strong>Dirección del paciente:</strong> {contacto.direccion}</div>
          <div><strong>Teléfono del propietario:</strong> {contacto.telefono}</div>
          <div><strong>Correo del propietario:</strong> {contacto.correo}</div>
          <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button className='imprimir'>Imprimir</button>
            <button className='enviar' onClick={handleSubmit}>Enviar Solicitud</button>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Revision;
