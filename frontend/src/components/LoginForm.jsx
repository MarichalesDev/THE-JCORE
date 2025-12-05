import React, { useState } from "react";
import { Link } from "react-router-dom"; // 👈 para navegación interna

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} style={{ }}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginBottom: 8 }}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginBottom: 8 }}
      />
      <button type="submit">Entrar</button>

      {/* 👇 Aquí va el link debajo del todo */}
      <p style={{ marginTop: 12}}>
        <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
      </p>
    </form>
  );
}

export default LoginForm;
