import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo ceo no bck.png";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (!user || !user.token) {
      sessionStorage.removeItem("user");
      setUser(null);
      navigate("/login");
      return;
    }

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      sessionStorage.removeItem("user");
      setUser(null);

      alert("Uspešno ste se odjavili.");
      navigate("/login");
    } catch (error) {
      console.error("Greška pri odjavljivanju:", error);
      alert("Došlo je do greške pri odjavljivanju.");
    }
  };

  return (
   <nav className="navbar">
    <div className="navbar-logo" onClick={() => navigate("/")}>
      <img src={logo} alt="Velvet Skills Logo" />
      <h2>Velvet Skills</h2>
    </div>

    {/* Desna sekcija: linkovi + user + logout */}
    <div className="navbar-right">
      <ul className="navbar-links">
        {!user && (
          <>
            <li><Link to="/login">Prijava</Link></li>
            <li><Link to="/register">Registracija</Link></li>
          </>
        )}
        {user?.role === "user" && (
          <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/profile">Profile</Link></li>
          </>
        )}
        {user?.role === "moderator" && (
          <li><Link to="/">ModeratorHome</Link></li>
        )}
        {user?.role === "admin" && (
          <li><Link to="/">AdminHome</Link></li>
        )}
      </ul>

      {user && (
        <div className="navbar-user">
          <span className="navbar-username">
            Prijavljena: <strong>{user.name}</strong>
          </span>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  </nav>

  );
};

export default Navbar;
