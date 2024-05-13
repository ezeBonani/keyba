import { useRouteError } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import apiRequest from "../../lib/apiRequest";
import "./profileError.scss";

export default function ProfileError() {
  let error = useRouteError();

  const { updateUser } = useContext(AuthContext);

  const logout = async () => {
    await apiRequest.post("/auth/logout");
  };

  if (error.status === 401 || error.status === 403) {
    setTimeout(() => {
      updateUser(null);
      logout();
    }, 5000);
  }

  return (
    <div className="profileError">
      {error.status === 401 || error.status === 403 ? (
        <div className="expirated">
          <p>Sesión expirada!</p>
          <p>Serás redirigido/a al Login en 5 segundos</p>
        </div>
      ) : (
        <p>{error.data}</p>
      )}
    </div>
  );
}
