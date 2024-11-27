import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    nombre: "",
    rol: "",
    photo: null // Add photo field
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      photo: file
    });
  };
  
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

    const formDataToSend = new FormData();
    formDataToSend.append('username', formData.username);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('nombre', formData.nombre);
    formDataToSend.append('rol', formData.rol);
    if (formData.photo) {
      formDataToSend.append('photo', formData.photo);
    }

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        credentials: "include",
        body: formDataToSend
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error en el registro");
      }

      // Registro exitoso
      navigate("/iniciar-sesion");
    } catch (err) {
      console.error('Submit error:', err); // Debug log
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mainReg">
      <div className="formDivReg">
        <form onSubmit={handleSubmit} className="formRegister">
          <h1 className="titleRegister">Registro</h1>
          <input
            type="text"
            name="username"
            placeholder="Usuario"
            value={formData.username}
            onChange={handleChange}
            minLength={3}
            maxLength={30}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            minLength={3}
            required
          />
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            minLength={3}
            maxLength={30}
            required
          />
          <select
            name="rol"
            value={formData.rol}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un rol</option>
            <option value="admin">Administrador Principal</option>
            <option value="user">Administrador</option>
          </select>
          <div className="file-input-wrapper">
            <input
              type="file"
              name="photo"
              accept=".jpg,.jpeg,.png"
              onChange={handleFileChange}
            />
          </div>
          <button type="submit" className="buttonRegister" disabled={loading}>
            {loading ? "Registrando..." : "Registrar"}
          </button>
          <button
            className="loginLink"
            onClick={() => navigate("/iniciar-sesion")}
            disabled={loading}
          >
            ¿Ya tienes cuenta? Inicia sesión
          </button>
        </form>
        {error && <div className="error-message">{error}</div>}
      </div>
      <div className="middle">
        {/* Copy the entire gradient background code from Login.js */}
        <svg xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
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
        <div className="gradients-container">
          <div className="g1"></div>
          <div className="g2"></div>
          <div className="g3"></div>
          <div className="g4"></div>
          <div className="g5"></div>
        </div>
      </div>
    </div>
  );
};

export default Register;
