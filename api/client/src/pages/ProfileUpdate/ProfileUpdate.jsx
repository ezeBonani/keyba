import { useContext, useState } from "react";
import "./profileUpdate.scss";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import UploadWidget from "../../components/UploadWidget/UploadWidget";

export default function ProfileUpdate() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const { currentUser, updateUser } = useContext(AuthContext);

  const [avatar, setAvatar] = useState([]);

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
      const res = await apiRequest.put(`/user/${currentUser.id}`, {
        username,
        email,
        password,
        avatar: avatar[0],
      });
      updateUser(res.data);
      setSuccess(true);
      setLoading(false);
      setTimeout(() => {
        navigate("/profile");
      }, 3000);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <div className="profileUpdate">
      <h1>Actualizar Perfil</h1>
      <div className="avatar">
        <img
          src={avatar[0] || currentUser.avatar || "/no-avatar.png"}
          alt="avatar"
        />
        <UploadWidget
          uwConfig={{
            cloudName: import.meta.env.VITE_CLOUDINARY_CLOUDNAME,
            uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
            multiple: false,
            maxImageFileSize: 2000000,
            folder: "avatars",
            sources: ["local", "google_drive", "camera", "url"],
          }}
          setState={setAvatar}
        />
      </div>
      {avatar.length > 0 && (
        <p>Para guardar la imágen clickeá en Actualizar Perfil</p>
      )}
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Nombre de Usuario</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            defaultValue={currentUser.username}
            required
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            required
            defaultValue={currentUser.email}
          />
          <label htmlFor="password">Nueva Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
          />
          <label htmlFor="password2">Reingresar nueva password</label>
          <input
            type="password"
            name="password2"
            id="password2"
            placeholder="password"
          />
          <button disabled={loading}>
            {loading ? "loading" : "Actualizar Perfil"}
          </button>
        </form>
        {error && <span className="error">Error: {error}</span>}
        {success && <span className="success">Perfil actualizado!</span>}
      </div>
    </div>
  );
}
