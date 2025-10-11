import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import loginImage from "../assets/login.jpg";

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Axios POST ka backendu
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email,
        password,
      });

      // Formiraj user objekat
      const userData = {
        id: response.data.user.id,
        name: response.data.user.name,
        role: response.data.user.role,
        token: response.data.token,
      };

      // Sačuvaj user u sessionStorage
      sessionStorage.setItem("user", JSON.stringify(userData));

      // Postavi stanje u App.js
      setUser(userData);

      alert(`Uspešno logovanje kao ${userData.role}`);
      navigate("/");
      window.location.reload();
    } catch (error) {
      alert("Greška prilikom logovanja. Proveri podatke.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page section">
      {/* Leva strana – forma */}
      <div className="login-form card">
        <h2 className="text-center mb-2">Prijavi se</h2>
        <form onSubmit={handleLogin}>
          <label>Email adresa</label>
          <input
            type="email"
            placeholder="Unesite email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mb-2"
          />

          <label>Lozinka</label>
          <input
            type="password"
            placeholder="Unesite lozinku..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mb-3"
          />

          <div className="login-buttons">
            <button type="submit" disabled={loading}>
              {loading ? "Prijavljivanje..." : "Prijavi se"}
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate("/register")}
            >
              Registruj se
            </button>
          </div>
        </form>
      </div>

      {/* Desna strana – slika */}
      <div className="login-image-container">
        <img src={loginImage} alt="Login ilustracija" className="login-image" />
      </div>
    </div>
  );
};

export default Login;
