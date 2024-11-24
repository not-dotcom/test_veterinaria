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
      console.log('Appending photo:', formData.photo); // Debug log
      formDataToSend.append('photo', formData.photo);
    }

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        credentials: "include",
        body: formDataToSend
      });

      const data = await response.json();
      console.log('Response data:', data); // Debug log

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
      <h1>Register</h1>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
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
        ></input>
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
        <input
          type="file"
          name="photo"
          accept=".jpg,.jpeg,.png"
          onChange={handleFileChange}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Registrando..." : "Registrar"}
        </button>
      </form>
      <button
        className="login-link"
        onClick={() => navigate("/iniciar-sesion")}
        disabled={loading}
      >
        ¿Ya tienes cuenta? Inicia sesi��n
      </button>
    </div>
  );
};

export default Register;
