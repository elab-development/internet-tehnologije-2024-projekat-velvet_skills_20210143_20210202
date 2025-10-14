import React, { useEffect, useState } from "react";
import axios from "axios";
import { useImageModal } from "../hooks/useImageModal"; 
import { Link } from "react-router-dom";

const ModeratorHome = () => {
  const [credentials, setCredentials] = useState([]);
  const [meta, setMeta] = useState(null);
  const [filters, setFilters] = useState({ title: "", status: "" });
  const [loading, setLoading] = useState(false);
  const { openImage, ImageModal } = useImageModal();

  const token = JSON.parse(sessionStorage.getItem("user"))?.token;

  // Dohvatanje kredencijala sa filterima i paginacijom
  const fetchCredentials = async (page = 1) => {
    setLoading(true);
    try {
      const validFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== "")
      );

      const response = await axios.get(
        `http://127.0.0.1:8000/api/moderator/credentials?page=${page}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: validFilters,
        }
      );

      setCredentials(response.data.data);
      setMeta(response.data.meta);
    } catch (error) {
      console.error("Greška pri učitavanju:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCredentials();
  }, [filters]);

  // Promena statusa kredencijala
  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/moderator/credentials/${id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(" Status uspešno ažuriran!");
      fetchCredentials(meta?.current_page || 1);
    } catch (error) {
      alert(" Greška pri ažuriranju statusa.");
      console.error(error);
    }
  };

  // Grupisanje po korisniku
  const groupedByUser = credentials.reduce((groups, credential) => {
    const userName = credential.user.name;
    if (!groups[userName]) groups[userName] = [];
    groups[userName].push(credential);
    return groups;
  }, {});

  return (
    <div className="section" >
      <nav className="breadcrumbs">
      <Link to="/home">Home</Link> 
      </nav>
      <h1>Moderator Home Stranica</h1>
      <p className="mb-3" style={{ maxWidth: "800px" }}>
        Ovde moderator može pregledati sve prijavljene kredencijale korisnika,
        menjati njihov status i filtrirati po nazivu ili statusu.
      </p>

      {/* Filteri */}
      <div className="card filters">
        <input
          type="text"
          placeholder="Pretraga po nazivu kredencijala..."
          value={filters.title}
          onChange={(e) => setFilters({ ...filters, title: e.target.value })}
        />
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">Svi statusi</option>
          <option value="pending">Na čekanju</option>
          <option value="approved">Odobreni</option>
          <option value="rejected">Odbijeni</option>
        </select>
        <button onClick={() => fetchCredentials()}>Primeni filter</button>
      </div>

      {/* Loading indikator */}
      {loading && <p>Učitavanje kredencijala...</p>}

      {/* Grupisani kredencijali */}
      {!loading &&
        Object.entries(groupedByUser).map(([userName, creds]) => (
          <div key={userName} className="user-section">
            <h2>{userName}</h2>
            <div className="card-grid">
              {creds.map((c) => (
                <div key={c.id} className="card">
                  {/*  Slika + fullscreen */}
                  <div className="credential-image-wrapper">
                    <img
                      src={c.file}
                      alt={c.title}
                      className="credential-image"
                      onClick={() => openImage(c.file)}
                    />
                    <button
                      className="btn-view"
                      onClick={() => openImage(c.file)}
                    >
                      Uvećaj
                    </button>
                  </div>

                  {/* Informacije */}
                  <div className="credential-body">
                    <h3>{c.title}</h3>
                    <p>
                      <strong>Veština:</strong> {c.skill.name} (
                      {c.skill.category})
                    </p>
                    <p>
                      <strong>Tip kredencijala:</strong> {c.type}
                    </p>
                    <p>
                      <strong>Status kredencijala:</strong>{" "}
                      <span className={`status ${c.status}`}>{c.status}</span>
                    </p>
                    <p>
                      <strong>Izdato:</strong> {c.issue_date} <br />
                      <strong>Važi do:</strong> {c.expiry_date}
                    </p>

                    {/* Akcije */}
                    <div className="card-actions">
                      <button
                        onClick={() => handleStatusChange(c.id, "approved")}
                        className="btn-approve"
                      >
                        Odobri
                      </button>
                      <button
                        onClick={() => handleStatusChange(c.id, "rejected")}
                        className="btn-reject"
                      >
                         Odbij
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

      {/* Paginacija */}
      {meta && (
        <div className="pagination">
          {meta.links
            .filter(
              (link) =>
                link.label !== "&laquo; Previous" &&
                link.label !== "Next &raquo;"
            )
            .map((link, index) => (
              <button
                key={index}
                className={`page-btn ${link.active ? "active" : ""}`}
                onClick={() => fetchCredentials(link.page)}
              >
                {link.label}
              </button>
            ))}
        </div>
      )}

      {/* Modal za fullscreen slike */}
      <ImageModal />
    </div>
  );
};

export default ModeratorHome;
