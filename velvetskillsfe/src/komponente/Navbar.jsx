import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo ceo no bck.png";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* Logo sekcija */}
      <div className="navbar-logo" onClick={() => navigate("/")}>
        <img src={logo} alt="Velvet Skills Logo" />
      </div>

      {/* Linkovi desno */}
      <ul className="navbar-links">
        {/* Ako nije ulogovan */}
        {!user && (
          <>
            <li>
              <Link to="/login">Prijava</Link>
            </li>
            <li>
              <Link to="/register">Registracija</Link>
            </li>
          </>
        )}

        {/* Ako je user */}
        {user?.role === "user" && (
          <>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        )}

        {/* Ako je moderator */}
        {user?.role === "moderator" && (
          <>
            <li>
              <Link to="/">ModeratorHome</Link>
            </li>
            <li>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        )}

        {/* Ako je admin */}
        {user?.role === "admin" && (
          <>
            <li>
              <Link to="/">AdminHome</Link>
            </li>
            <li>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
