import { useContext, useState } from "react";
import "./login.scss";
import { useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { updateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      setLoading(true);
      const res = await apiRequest.post("/auth/login", {
        username,
        password,
      });
      setLoading(false);

      updateUser(res.data);

      navigate("/");
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <h1>Login de usuario</h1>
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Nombre de Usuario</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            required
            minLength={3}
            maxLength={20}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            required
          />
          <button disabled={loading}>{loading ? "loading" : "Ingresar"}</button>
          {error && <span className="error">{error}</span>}
        </form>
      </div>
      <p>* Esta sección es sólo para los anfitriones de KEYBA *</p>
    </div>
  );
}
