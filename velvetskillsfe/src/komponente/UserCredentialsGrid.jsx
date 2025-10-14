import React, { useEffect, useState } from "react";
import axios from "axios";
import { useImageModal } from "../hooks/useImageModal";

const UserCredentialsGrid = ({ refreshKey }) => {
  const [credentials, setCredentials] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = JSON.parse(sessionStorage.getItem("user"))?.token;
  const { openImage, ImageModal } = useImageModal();

  // Dohvati korisnikove kredencijale
  const fetchCredentials = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/credentials", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCredentials(response.data.data || []);
    } catch (error) {
      console.error("Greška pri dohvatanju kredencijala:", error);
    } finally {
      setLoading(false);
    }
  };

  // Obrisi kredencijal
  const handleDelete = async (id, title) => {
    if (!window.confirm(`Obrisati kredencijal "${title}"?`)) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/api/credentials/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Kredencijal uspešno obrisan!");
      fetchCredentials(); // osveži listu
    } catch (error) {
      console.error("Greška pri brisanju kredencijala:", error);
    }
  };

  // Učitaj kredencijale kad se komponenta mountuje ili refreshKey promeni
  useEffect(() => {
    fetchCredentials();
  }, [refreshKey]);

  // Prikaz loading stanja
  if (loading) return <p>Učitavanje kredencijala...</p>;

  return (
    <div className="credentials-grid-section">
      <h2>Moji kredencijali</h2>

      {credentials.length === 0 ? (
        <p>Nema dodatih kredencijala.</p>
      ) : (
        <div className="card-grid">
          {credentials.map((c) => (
            <div key={c.id} className="card credential-card">
              {/* Slika i dugme za prikaz */}
              <div className="credential-image-wrapper">
                <img
                  src={c.file}
                  alt={c.title}
                  className="credential-image"
                  onClick={() => openImage(c.file)}
                />
                <button className="btn-view" onClick={() => openImage(c.file)}>
                  Uvećaj
                </button>
              </div>

              {/* Tekstualni deo */}
              <div className="credential-body">
                <h3>{c.title}</h3>
                <p>
                  <strong>Veština:</strong> {c.skill.name} ({c.skill.category})
                </p>
                <p>
                  <strong>Tip:</strong> {c.type}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className={`status ${c.status}`}>{c.status}</span>
                </p>
                <p>
                  <strong>Izdato:</strong> {c.issue_date || "-"} <br />
                  <strong>Važi do:</strong> {c.expiry_date || "-"}
                </p>

                {c.reviewed_by && (
                  <p>
                    <strong>Odobrio:</strong> {c.reviewed_by.name}
                  </p>
                )}

                <button
                  className="btn-delete"
                  onClick={() => handleDelete(c.id, c.title)}
                >
                  Obriši
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal za fullscreen slike */}
      <ImageModal />
    </div>
  );
};

export default UserCredentialsGrid;
