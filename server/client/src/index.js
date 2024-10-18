import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserView from './userView'; // Ensure the component name starts with an uppercase letter
import DoctorView from './doctorView';
import Login from '../src/components/login/login.js';
import Register from '../src/components/register/register.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './landing/index.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />} />
        <Route path="/user" element={<UserView />} />
        <Route path="/doctors" element={<DoctorView />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/landing" element={<Landing />} />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);



// import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Header from './Header';
// import InputSolic from './InputSolic';
// import ListSolicitudes from './ListSolicitudes';
// import OtraRuta from './OtraRuta'; // Importa tus otros componentes

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Header />
//         <Switch>
//           <Route exact path="/" component={InputSolic} />
//           <Route path="/list" component={ListSolicitudes} />
//           <Route path="/otra" component={OtraRuta} />
//           {/* Agrega más rutas según sea necesario */}
//         </Switch>
//       </div>
//     </Router>
//   );
// }

// export default App;