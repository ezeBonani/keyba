import { useContext, useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const { currentUser, updateUser } = useContext(AuthContext);

  if (open) {
    window.scrollTo(0, 0);
    document.body.style.overflowY = "hidden";
  } else {
    document.body.style.overflowY = "scroll";
  }

  const handleLogout = async () => {
    try {
      setOpen(false);
      await apiRequest.post("/auth/logout");
      updateUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav>
      <div className="left">
        <Link to="/">
          <img className="logo" src="/logo-bajada-negro.png" alt="logo" />
        </Link>
        <Link to="/" className="navlink">
          Home
        </Link>
        <Link to="/sobre-nosotros" className="navlink">
          Sobre Nosotros
        </Link>
        <Link to="contacto" className="navlink">
          Contacto
        </Link>
      </div>
      <div className="right">
        {currentUser ? (
          <div className="user">
            <div className="user-info">
              <img src={currentUser.avatar || "/no-avatar.png"} alt="avatar" />
              <span>{currentUser.username}</span>
            </div>
            <Link to="/profile">Perfil</Link>
          </div>
        ) : (
          <Link to="login" className="navlink">
            Login
          </Link>
        )}
        <div className="menuIcon" onClick={() => setOpen((prev) => !prev)}>
          <img src="/menu2.png" alt="menu-icon" />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <Link to="/" className="navlink" onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link
            to="/sobre-nosotros"
            className="navlink"
            onClick={() => setOpen(false)}
          >
            Sobre Nosotros
          </Link>
          <Link
            to="/contacto"
            className="navlink"
            onClick={() => setOpen(false)}
          >
            Contacto
          </Link>
          {currentUser ? (
            <Link to="/" className="navlink" onClick={handleLogout}>
              Log out
            </Link>
          ) : (
            <Link
              to="/login"
              className="navlink"
              onClick={() => setOpen(false)}
            >
              Login
            </Link>
          )}
          <img src="/logo-bajada-blanco.png" alt="logo" />
        </div>
      </div>
    </nav>
  );
}
