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
import { EmblaCarousel } from './landing/carousel/carousel.js';
import Pruebas from './components/pruebas/pruebas.js';
import InputSolic from './components/inputSolic/InputSolic.js';
import Galeria from './components/Galeria/Galeria.js';
import { AuthProvider } from './context/AuthContext.js';
import ProtectedRoute from './components/ProtectedRoute';
import AdminUsers from './components/adminUsers/AdminUsers.js';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        /*Proteger */
        <Route path="/" element={<Landing />} />{/*PAGINA PRINCIPAL*/}
        <Route path="/app" element={
            <ProtectedRoute>
              <App />
            </ProtectedRoute>} />{/*Lista de solicitudes*/}
        <Route path="/user" element={<UserView />} />{/*Hacer una solicitud*/}
        <Route path="/iniciar-sesion" element={<Login />} />{/*Iniciar sesion*/}
        <Route path="/register" element={
          <ProtectedRoute>
            <Register />
            </ProtectedRoute>} />{/*Registrar*/}
         <Route path="/galeria" element={<Galeria />} /> {/*Galeria */}
         <Route path="/doctors" element={
            <ProtectedRoute>
              <DoctorView />
            </ProtectedRoute>
          } />{/*Lista de Doctores*/}
          <Route path="/users" element={<AdminUsers />} />
          
      </Routes>
    </BrowserRouter>
    </AuthProvider>
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