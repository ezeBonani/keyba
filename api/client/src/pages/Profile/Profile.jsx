import { Link, useLoaderData, useNavigate } from "react-router-dom";
import List from "../../components/list/List";
import apiRequest from "../../lib/apiRequest";
import "./profile.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Profile() {
  const navigate = useNavigate();
  const data = useLoaderData();

  const { currentUser, updateUser } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="profile">
      <div className="wrapper">
        <div className="title">
          <h1>Información del Usuario</h1>
          <button onClick={() => navigate("/profile/update")}>
            Actualizar Perfil
          </button>
        </div>
        <div className="info">
          <div className="avatar">
            <span>Avatar:</span>{" "}
            <img src={currentUser.avatar || "/no-avatar.png"} alt="avatar" />
          </div>
          <span>
            Username: <b>{currentUser.username}</b>{" "}
            {currentUser.admin && (
              <b>
                <i>[admin]</i>
              </b>
            )}
          </span>
          <span>
            Email: <b>{currentUser.email}</b>
          </span>
          <div className="userActions">
            {currentUser.admin && (
              <button className="newUser" onClick={() => navigate("/register")}>
                + Crear usuario
              </button>
            )}
            <button className="logout" onClick={handleLogout}>
              Log Out
            </button>
          </div>
        </div>
        <div className="title">
          <h1>Lista de mis Publicaciones</h1>
          <Link to="/add">
            <button>+ Crear Publicación</button>
          </Link>
        </div>

        {data.length > 0 ? (
          <List posts={data} />
        ) : (
          <p>No has creado publicaciones</p>
        )}
      </div>
    </div>
  );
}
