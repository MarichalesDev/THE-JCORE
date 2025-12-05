import React, { useState } from "react";
import { useSearchParams, useParams, Link } from "react-router-dom";
import { resetPassword } from "../services/auth"; // servicio que llama a tu API

function ResetPassword() {
  const { token } = useParams();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!password || !passwordConf) {
      setMessage("Completa todos los campos.");
      return;
    }
    if (password !== passwordConf) {
      setMessage("Las contraseñas no coinciden.");
      return;
    }

    try {
        await resetPassword({
        token,
        email,
        password,
        password_confirmation: passwordConf,
      });
      setMessage("Contraseña restablecida correctamente. Ahora puedes iniciar sesión.");
      setSuccess(true)

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
      <h2>Restablecer contraseña</h2>
      {message && <div>{message}</div>}

      {!success ? (
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Nueva contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={passwordConf}
            onChange={(e) => setPasswordConf(e.target.value)}
          />
          <button type="submit">Cambiar contraseña</button>
        </form>
      ) : (
        <div style={{ marginTop: "1rem" }}>
          {/* 👇 aparece solo después del éxito */}
          <Link to="/">
            <button>Ir a inicio de sesión</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default ResetPassword;
