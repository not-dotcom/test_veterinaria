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
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/app" element={
            <ProtectedRoute>
              <App />
            </ProtectedRoute>} />
        <Route path="/user" element={<UserView />} />
        <Route path="/user2" element={<InputSolic />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/landing" element={<Landing />} />
         <Route path="/caro" element={<EmblaCarousel />} /> {/*Esta ruta es provisional */}
         <Route path="/test" element={<Pruebas />} /> {/*Esta ruta es provisional */}
         <Route path="/galeria" element={<Galeria />} /> {/*Esta ruta es provisional */}
         <Route path="/doctors" element={
            <ProtectedRoute>
              <DoctorView />
            </ProtectedRoute>
          } />
          
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