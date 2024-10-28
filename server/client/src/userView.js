import React, { Fragment, useState } from 'react';
import './userView.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//components
import InputSolic from './components/inputSolic/InputSolic';
import Header from './components/header/header';
import InfoPaciente from './components/inputSolic/form/infoPaciente/InfoPaciente';
import InfoServicio from './components/inputSolic/form/infoServicio/InfoServicio';
import InfoContacto from './components/inputSolic/form/infoContacto/InfoContacto';
import Revision from './components/inputSolic/form/Revision/Revision';
function UserView() {
  const [page, setPage] = useState(0);
  const PageDisplay = () => {
    switch (page) {
      case 0:
        return <InfoPaciente></InfoPaciente>
      case 1:
        return <InfoServicio></InfoServicio>
      case 2:
        return <InfoContacto></InfoContacto>
      case 3:
        return <Revision></Revision>
      default:
        return <InfoPaciente></InfoPaciente>
    }
  }
  const FormTitles = ["Paciente", "Servicio", "Contacto", "Revision"];
  const getClassNames = () => {
    return {
      statusSolic: page === 0 ? 'statusSolic' : page === 1 ? 'statusSolic' : page === 2 ? 'statusSolic' : 'statusSolic',
      Number1: page >= 0 ? 'numberCurrent' : 'number',
      Number2: page >= 1 ? 'numberCurrent' : 'number',
      Number3: page >= 2 ? 'numberCurrent' : 'number',
      Number4: page >= 3 ? 'numberCurrent' : 'number',
      divNumber1: page === 0 ? 'numberDivCurrent1' : 'staticNumberDiv',
      divNumber2: page < 1 ? 'numberDiv' : page === 1 ? 'numberDivCurrent1' : page > 1 ? 'staticNumberDiv' : 'numberDiv',
      divNumber3: page < 2 ? 'numberDiv' : page === 2 ? 'numberDivCurrent1' : page > 2 ? 'staticNumberDiv' : 'numberDiv',
      divNumber4: page === 3 ? 'numberDivCurrent4' : 'numberDiv',

    };
  };
  const classes = getClassNames();


  return (
    <div className="userContainer">


      <div className="headerUser">
        <Header>
        </Header>
      </div>


      <div className="statusSolic">
        <div className='statusContainer'>
          <div className='stepDiv1'>
            <div className={classes.divNumber1}><p className={classes.Number1}>1</p></div>
            <div className='textDiv'> <p className='text'>Informacion del paciente</p></div>
          </div>
          <div className='stepDiv2'>
            <div className={classes.divNumber2}><p className={classes.Number2}>2</p></div>
            <div className='textDiv'><p className='text'>Tipo de servicio</p></div>
          </div>
          <div className='stepDiv3'>
            <div className={classes.divNumber3}><p className={classes.Number3}>3</p></div>
            <div className='textDiv'><p className='text'>Contacto</p></div>
          </div>
          <div className='stepDiv4'>
            <div className={classes.divNumber4}><p className={classes.Number4}>4</p></div>
            <div className='textDiv'><p className='text'>Revision</p></div>
          </div>

        </div>
      </div>


      <div className='body'>
        <label className='headerProv'>{FormTitles[page]}</label>
        {PageDisplay()}
        <div className='botones'><button
          disabled={page == FormTitles < 0}
          onClick={() => {
            setPage((currPage) => currPage - 1);
          }}

        >Prev</button>
          <button
            disabled={page == FormTitles.length - 1}
            onClick={() => {
              setPage((currPage) => currPage + 1);
            }}
          >
            Next</button>
        </div>
      </div>


    </div>
  );
}

export default UserView;
