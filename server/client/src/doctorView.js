import React, { Fragment } from 'react';
import './doctorView.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


//components
import InputDoctor from './components/inputDoctor/InputDoctor';
import Header from './components/header/header';
function doctorView() {
  return (
    <div className="App">
      <Header />
      <InputDoctor />
    </div>
  );
}

export default doctorView;