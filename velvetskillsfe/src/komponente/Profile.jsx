import React, { useEffect, useState } from "react";
import axios from "axios";
import { usePexelsImage } from "../hooks/usePexelsImage";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = JSON.parse(sessionStorage.getItem("user"))?.token;

  const { image, loading: loadingImage, fetchImage } = usePexelsImage("motivation");

  // Učitavanje profila korisnika
  const fetchProfile = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data.data);
    } catch (error) {
      console.error("Greška pri dohvatanju profila:", error);
    } finally {
      setLoading(false);
    }
  };

  // Ažuriranje bio korisnika
  const handleUpdateBio = async () => {
    try {
      await axios.put(
        "http://127.0.0.1:8000/api/profile",
        { bio: user.bio },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Bio uspešno ažuriran!");
    } catch (error) {
      alert("Greška pri ažuriranju bio opisa.");
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchImage();
  }, []);

  if (loading) return <p>Učitavanje profila...</p>;

  return (
    <div className="section profile-page">
      <h1>Moj Profil</h1>
      <p className="page-desc">
        Ovde možeš videti svoje osnovne podatke, ažurirati opis i pogledati motivacionu sliku dana. 💫
      </p>

      {/* Gornji deo - dve kartice */}
      <div className="profile-top">
        {/* Leva kartica */}
        <div className="card add-credential">
          <h2>Dodaj novi kredencijal</h2>
          <p>Ovde ćeš kasnije moći da dodaješ svoje diplome, sertifikate i veštine.</p>
        </div>

        {/* Desna kartica - profil */}
        {user && (
          <div className="card profile-card">
            <div className="profile-info">
              <h2>{user.name}</h2>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Uloga:</strong> {user.role}</p>

              <textarea
                value={user.bio || ""}
                placeholder="Unesi kratak opis o sebi..."
                onChange={(e) => setUser({ ...user, bio: e.target.value })}
                className="bio-input"
              />

              <button className="btn-save" onClick={handleUpdateBio}>
                Sačuvaj promene
              </button>
            </div>

            {/* Slika motivacije */}
            <div className="gif-section">
              {loadingImage ? (
                <p>Učitavanje slike...</p>
              ) : image ? (
                <>
                  <img src={image} alt="Motivaciona slika" className="profile-gif" />
                  <button className="btn-regenerate" onClick={fetchImage}>
                    Regeneriši sliku
                  </button>
                </>
              ) : (
                <p>Nema slike za prikaz.</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Donji deo - tabela */}
      <div className="profile-bottom">
        <h2>Moje veštine</h2>
        <div className="card empty-table">
          <p>Tabela veština će biti prikazana ovde.</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
