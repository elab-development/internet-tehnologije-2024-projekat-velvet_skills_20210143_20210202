import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Navbar from "./reusable/Navbar";
import Home from "./komponente/Home";
import Login from "./komponente/Login";
import Register from "./komponente/Register";
import Profile from "./komponente/Profile";
import AdminHome from "./komponente/AdminHome";
import ModeratorHome from "./komponente/ModeratorHome";
import Footer from "./reusable/Footer";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <BrowserRouter>
      {/* Navbar uvek vidljiv */}
      <Navbar user={user} setUser={setUser} />

      <div className="App">
        <Routes>
          {!user && (
            <>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login setUser={setUser} />} />
              <Route path="/register" element={<Register setUser={setUser} />} />
            </>
          )}

          {user?.role === "user" && (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}

          {user?.role === "moderator" && (
            <>
              <Route path="/" element={<ModeratorHome />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}

          {user?.role === "admin" && (
            <>
              <Route path="/" element={<AdminHome />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
        {/* Footer samo ako je korisnik ulogovan */}
      {user && <Footer />}
      </div>
    </BrowserRouter>
  );
}

export default App;
