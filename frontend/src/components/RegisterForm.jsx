import React, { useState } from "react";

function RegisterForm({ onRegister }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [error, setError] = useState(""); // mensaje local

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); 

    if (!name || !email || !password || !passwordConf) {
      setError("Completa todos los campos.");
      return;
    }

    if (password !== passwordConf) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    onRegister({
      name,
      email,
      password,
      password_confirmation: passwordConf, 
    });
    
    setName("");
    setEmail("");
    setPassword("");
    setPasswordConf("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registro</h2>

      {/* Mensaje de error local */}
      {error && (
        <div style={{ color: "red", marginBottom: "8px" }}>
          {error}
        </div>
      )}

      <input
        type="text"
        placeholder="Nombre completo"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirmar contraseña"
        value={passwordConf}
        onChange={(e) => setPasswordConf(e.target.value)}
      />

      <button type="submit">Registrarme</button>
    </form>
  );
}

export default RegisterForm;
