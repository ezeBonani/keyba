import { useState } from "react";
import "./register.scss";
import { useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";

export default function Register() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const password2 = formData.get("password2");

    if (password !== password2) {
      setError("No coinciden los passwords");
      return;
    }

    try {
      setLoading(true);
      const res = await apiRequest.post("/auth/register", {
        username,
        email,
        password,
      });
      setSuccess(true);
      setLoading(false);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <div className="register">
      <h1>Crear nuevo usuario</h1>
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Nombre de Usuario</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            required
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            required
          />
          <label htmlFor="password2">Reingresar password</label>
          <input
            type="password"
            name="password2"
            id="password2"
            placeholder="password"
            required
          />
          <button disabled={loading}>
            {loading ? "loading" : "Crear Usuario"}
          </button>
        </form>
        {error && <span className="error">Error: {error}</span>}
        {success && (
          <span className="success">Usuario creado exitosamente!</span>
        )}
      </div>
      <p>
        <b>
          * Los usuarios solo pueden ser creados o eliminados por los
          administradores del sitio *
        </b>
      </p>
    </div>
  );
}
