import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import loginImage from "../assets/login.jpg";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Slanje podataka na backend
      await axios.post("http://127.0.0.1:8000/api/register", {
        name,
        email,
        password,
      });

      alert("Uspešna registracija! Sada se možete prijaviti.");
      navigate("/login"); // prebacuje korisnika na login
    } catch (error) {
      console.error("Greška pri registraciji:", error);
      if (error.response?.data?.errors) {
        const messages = Object.values(error.response.data.errors)
          .flat()
          .join("\n");
        alert(messages);
      } else {
        alert("Registracija neuspešna. Proverite podatke.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page section">
      {/* Leva strana – forma */}
      <div className="login-form card">
        <h2 className="text-center mb-2">Registruj se</h2>
        <form onSubmit={handleRegister}>
          <label>Ime i prezime</label>
          <input
            type="text"
            placeholder="Unesite ime..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mb-2"
          />

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
              {loading ? "Registracija..." : "Registruj se"}
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate("/login")}
            >
              Prijavi se
            </button>
          </div>
        </form>
      </div>

      {/* Desna strana – slika */}
      <div className="login-image-container">
        <img
          src={loginImage}
          alt="Register ilustracija"
          className="login-image"
        />
      </div>
    </div>
  );
};

export default Register;
