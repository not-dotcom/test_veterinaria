import React, { Fragment } from 'react';
import './userView.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


//components
import InputSolic from './components/inputSolic/InputSolic';
import Header from './components/header/header';
function userView() {
  return (
    <div className="App">
      <Header></Header>
      <InputSolic />
    </div>
  );
}

export default userView;
