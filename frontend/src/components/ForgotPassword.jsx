import React, { useState } from "react";
import { forgotPassword } from "../services/auth"; // servicio que llama a tu API

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
     await forgotPassword({ email });
      setMessage("Se envió un correo con el enlace de recuperación.");
    } catch (err) {
      const errMsg =
        err.response?.data?.message ||
        JSON.stringify(err.response?.data?.errors || {}) ||
        err.message;
      setMessage(`Error: ${errMsg}`);
    }
  };

  return (
    <div>
      <h2>Recuperar contraseña</h2>
      {message && <div>{message}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Tu correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Enviar enlace</button>
      </form>
    </div>
  );
}

export default ForgotPassword;
