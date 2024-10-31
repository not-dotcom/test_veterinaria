import React from 'react'
import './Revision.css'

function Revision() {
  return (
    <div className="mainReporte" style={{display:"flex", justifyContent:"center", width:"100%"}}>
      <div style={{ padding: '20px 20px 20px 20px', fontFamily: 'Arial, sans-serif', border:"3px solid #E8e8e8" }}>
      <div style={{ fontWeight: '600', fontSize: '24px', textAlign: 'center' }}>
        Clínica Veterinaria UDES - Bucaramanga
      </div>
      
      <div style={{ marginTop: '0px', textAlign: 'center', fontSize: '10px' }}>
        <div>13 de septiembre del 2024</div>
        <div style={{ fontWeight: '200', fontSize:"20px" }}>Cita agendada</div>
      </div>
      
      <div style={{ marginTop: '20px', fontSize: '16px', lineHeight: '1.8' }}>
        <div><strong>Nombre del propietario:</strong> María López</div>
        <div><strong>Número de cédula:</strong> 987654321</div>
        <div><strong>Nombre del paciente:</strong> Michi</div>
        <div><strong>Cita agendada el día:</strong> 16 de septiembre del 2024 a las 11:30:00</div>
        <div><strong>Tipo de servicio:</strong> Vacunación</div>
        <div><strong>Forma de pago:</strong> Tarjeta de crédito</div>
        <div><strong>Tipo de cliente:</strong> Particular</div>
        <div><strong>Dirección del paciente:</strong> Avenida Siempre Viva 742</div>
        <div><strong>Teléfono del propietario:</strong> 5559876543</div>
        <div><strong>Correo del propietario:</strong> marialopez@example.com</div>
        <div><button className='imprimir'>Imprimir</button></div>
      </div>
    </div>
    </div>
  )
}

export default Revision
