import { Navigate, Outlet, useNavigation } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import "./layout.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";

export default function Layout() {
  const navigation = useNavigation();
  return (
    <>
      <div className="layout">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="content">
          {navigation.state == "loading" ? <LoadingIndicator /> : <Outlet />}
        </div>
      </div>
    </>
  );
}

export function RequireAuth() {
  const navigation = useNavigation();
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    currentUser && (
      <div className="layout">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="content">
          {navigation.state == "loading" ? <LoadingIndicator /> : <Outlet />}
        </div>
      </div>
    )
  );
}
