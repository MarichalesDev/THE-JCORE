import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import UserProfile from "./components/UserProfile";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import {
  register as registerUser,
  login as loginUser,
  getAuthenticatedUser,
  logout as logoutUser,
  sendVerificationEmail,
} from "./services/auth";


function App() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      getAuthenticatedUser()
        .then((u) => setUser(u))
        .catch(() => localStorage.removeItem("auth_token"));
    }
  }, []);

  const handleRegister = async (data) => {
    try {
      const res = await registerUser(data);
      localStorage.setItem("auth_token", res.token);
      await sendVerificationEmail();
      setMessage("Registro exitoso. Verifica tu correo.");
    } catch (err) {
      setMessage("Error al registrar.");
    }
  };

const handleLogin = async (data) => {
  setMessage("");
  try {
    const token = await loginUser(data);
    if (!token) throw new Error("Token no recibido.");
    const u = await getAuthenticatedUser();
    setUser(u);
    setMessage("Login exitoso.");
  } catch (err) {
    const errMsg =
      err.response?.data?.message ||
      JSON.stringify(err.response?.data?.errors || {}) ||
      err.message;
    setMessage(`Error al iniciar sesión: ${errMsg}`);
  }
};


  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    localStorage.removeItem("auth_token");
    setMessage("Sesión cerrada.");
  };

  return (
   <div>
      <h1>Mi App</h1>
      {message && <div>{message}</div>}

      <Routes>
        {/* 👇 Cuando estés en /forgot-password, solo se renderiza ForgotPassword */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
         <Route path="/password-reset/:token" element={<ResetPassword />} />
        {/* 👇 Ruta raíz "/" muestra login/registro o perfil */}
        <Route
          path="/"
          element={
            user ? (
              <UserProfile user={user} onLogout={handleLogout} />
            ) : (
              <>
                <RegisterForm onRegister={handleRegister} />
                <LoginForm onLogin={handleLogin} />
              </>
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
