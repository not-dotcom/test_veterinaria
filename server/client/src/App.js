import React, { Fragment, useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//components
import ListSolicitudes from './components/get/ListSolic';
import InputSolic from './components/inputSolic/InputSolic';
import Header from './components/header/header';

function App() {
  const [solicitudes, setSolicitudes] = useState([]);

  const getSolicitudes = async () => {
    try {
      const response = await fetch("http://localhost:5000/solicitudes");
      const jsonData = await response.json();
      setSolicitudes(jsonData);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getSolicitudes();
  }, []);

  return (
    <div className="App">
      <Header />
   
      <ListSolicitudes solicitudes={solicitudes} setSolicitudes={setSolicitudes} />
      <InputSolic getSolicitudes={getSolicitudes} />
    </div>
  );
}

export default App;