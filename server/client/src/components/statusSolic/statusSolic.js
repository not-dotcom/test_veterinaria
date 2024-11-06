import React from 'react'
import './statusSolic.css'
function statusSolic() {
  return (
    <div className='statusContainer'>
      <div className='stepDiv1'>
        <div className='numberDiv'><p className='number'>1</p></div>
        <div className='textDiv'> <p className='text'>Información del paciente</p></div>
      </div>
      <div className='stepDiv2'>
        <div className='numberDiv'><p className='number'>2</p></div>
        <div className='textDiv'><p>Tipo de servicio</p></div>
      </div>
      <div className='stepDiv3'>
        <div className='numberDiv'><p className='number'>3</p></div>
        <div className='textDiv'><p>Contacto</p></div>
      </div>
      <div className='stepDiv4'>
        <div className='numberDiv'><p className='number'>4</p></div>
        <div className='textDiv'><p>Revisión</p></div>
      </div>

    </div>
    
  )
}

export default statusSolic
