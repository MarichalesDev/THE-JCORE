
function UserProfile({ user, onLogout }) {
  return (
    <div>
      <h2>Perfil</h2>
      <p><strong>Nombre:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Verificado:</strong> {user.email_verified_at ? "Sí" : "No"}</p>
      <button onClick={onLogout}>Cerrar sesión</button>
    </div>
  );
}

export default UserProfile;
