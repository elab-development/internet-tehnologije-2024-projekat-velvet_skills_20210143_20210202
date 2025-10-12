import React, { useState, useEffect } from "react";
import axios from "axios";
import ReusableTable from "../reusable/ReusableTable";
import adminImg1 from "../assets/admin1.jpg";
import adminImg2 from "../assets/admin2.webp";

const AdminHome = () => {
  const [users, setUsers] = useState([]);
  const [meta, setMeta] = useState(null);
  const [filters, setFilters] = useState({ name: "" });
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(sessionStorage.getItem("user"));

  // 🔄 Dohvatanje korisnika
  const fetchUsers = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/admin/users?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
          params: {
            name: filters.name || undefined,
          },
        }
      );

      setUsers(response.data.data);
      setMeta(response.data.meta);
    } catch (error) {
      console.error("Greška pri učitavanju korisnika:", error);
      alert("Greška pri učitavanju korisnika.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, name: e.target.value });
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchUsers();
  };

  const handleDeleteUser = async (row) => {
    if (!window.confirm(`Da li sigurno želite obrisati korisnika ${row.name}?`))
      return;

    try {
      await axios.delete(`http://127.0.0.1:8000/api/admin/users/${row.id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      alert("Korisnik uspešno obrisan.");
      fetchUsers(meta?.current_page || 1);
    } catch (error) {
      console.error("Greška pri brisanju:", error);
      alert("Nije moguće obrisati korisnika.");
    }
  };

  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Ime i prezime" },
    { key: "email", label: "Email adresa" },
    { key: "role", label: "Uloga korisnika" },
  ];

  const actions = [
    {
      label: "Obriši",
      className: "delete",
      onClick: handleDeleteUser,
    },
  ];

  return (
    <div className="admin-page section">
      {/* NASLOV I OPIS */}
      <div className="admin-header">
        <h1>Administrator Home Stranica</h1>
        <p>
          Dobrodošli na administratorski panel. Ovde možete pregledati sve
          registrovane korisnike, pretraživati ih po imenu i po potrebi ih
          ukloniti iz sistema. Kao administrator, imate punu kontrolu nad
          korisničkim nalozima i sadržajem.
        </p>

        {/* Slike */}
        <div className="admin-gallery">
          <img src={adminImg1} alt="Admin overview" />
          <img src={adminImg2} alt="Data management" />
        </div>
      </div>

      {/* FILTER */}
      <div className="admin-content">
        <h2 className="text-center mb-3">Spisak korisnika</h2>
        <form onSubmit={handleFilterSubmit} className="filter-bar card mb-3">
          <input
            type="text"
            placeholder="Pretraži po imenu..."
            value={filters.name}
            onChange={handleFilterChange}
          />
          <button type="submit">Pretraži</button>
        </form>

        {loading && <p className="text-center">Učitavanje...</p>}

        {!loading && (
          <ReusableTable columns={columns} data={users} actions={actions} />
        )}

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
                  onClick={() => fetchUsers(link.page)}
                >
                  {link.label}
                </button>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminHome;
