import { useState } from "react";
import "./resetPassword.scss";
import { useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";

export default function ResetPassword() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.target);
    const email = formData.get("email");

    try {
      setLoading(true);
      const res = await apiRequest.post("/auth/resetPassword", {
        email,
      });
      setSuccess(true);
      setLoading(false);
      setTimeout(() => {
        navigate("/login");
      }, 10000);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <div className="resetPassword">
      <h1>Resetear Password</h1>
      <p>Opción sólo disponible para quienes ya poseen un usuario creado</p>
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            required
          />
          <button disabled={loading}>
            {loading ? "loading" : "Resetear Password"}
          </button>
        </form>
      </div>
      {error && <span className="error">Error: {error}</span>}
      {success && (
        <span className="success">
          Password reseteado exitosamente! Revisá tu email para saber tu nueva
          password
        </span>
      )}
      <p>
        <b>
          * Los usuarios solo pueden ser creados o eliminados por los
          administradores del sitio *
        </b>
      </p>
    </div>
  );
}
