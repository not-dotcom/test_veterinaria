import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../media/profile.jpg"; // Importa la imagen del logo
import { API_URL } from "../../config"; 

const Login = (props) => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth(); // Obtener setIsAuthenticated del contexto
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        credentials: "include", // Importante
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error en el login");
      }
      //Login Exitoso
      setIsAuthenticated(true); // Actualizar estado de autenticación
      navigate("/app"); // Redirigir a ruta protegida
    } catch (err) {
      setError(err.message);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mainLogin">
      <div className="formDiv">
        <form onSubmit={handleSubmit} id="form" className="formLogin">
          <h1 className="titleLogin">Bienvenido</h1>
          <input
            type="text"
            placeholder="Usuario"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="buttonLogin" disabled={loading}>
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
        {error && <div className="error-message-login">{error}</div>}
      </div>
      <div className="middle">
        <svg xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="goo">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="10"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                result="goo"
              />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>
        <div class="gradients-container">
          <div class="g1"></div>
          <div class="g2"></div>
          <div class="g3"></div>
          <div class="g4"></div>
          <div class="g5"></div>
        </div>
      </div>
    </div>
  );
};
export default Login;
