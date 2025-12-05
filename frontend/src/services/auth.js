import api from "../api/client";

export async function register({ name, email, password, password_confirmation }) {
  const res = await api.post("/register", {
    name,
    email,
    password,
    password_confirmation,
  });
  const { token } = res.data;
  if (token) localStorage.setItem("auth_token", token);
  return res.data;
}

export async function login({ email, password }) {
  const res = await api.post("/login", { email, password }); 
  const { token } = res.data;
  if (!token) throw new Error("No se recibió token");
  localStorage.setItem("auth_token", token);
  return token;
}

export async function getAuthenticatedUser() {
  const res = await api.get("/user");
  return res.data;
}

export async function logout() {
  try {
    await api.post("/logout");
  } catch (_) {}
  localStorage.removeItem("auth_token");
}

export const sendVerificationEmail = async () => {
  try {
    const res = await api.post("/email/verification-notification");
    return res.data;
  } catch (err) {
    throw err;
  }
};

export async function forgotPassword(email) {
  const res = await api.post("/forgot-password", email);
  return res.data;
}

export async function resetPassword(password) {
  const res = await api.post("/reset-password", password);
  return res.data;
}
