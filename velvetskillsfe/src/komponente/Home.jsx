import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Link } from "react-router-dom";


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Home = () => {
  const [user, setUser] = useState(null);
  const [skills, setSkills] = useState([]);
  const [credentials, setCredentials] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = JSON.parse(sessionStorage.getItem("user"))?.token;

  // Fetch user profile
  const fetchProfile = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.data);
    } catch (error) {
      console.error("Greška pri dohvatanju profila:", error);
    }
  };

  // Fetch skills
  const fetchSkills = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/skills", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSkills(res.data.data);
    } catch (error) {
      console.error("Greška pri dohvatanju veština:", error);
    }
  };

  // Fetch credentials
  const fetchCredentials = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/credentials", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCredentials(res.data.data);
    } catch (error) {
      console.error("Greška pri dohvatanju kredencijala:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchSkills();
    fetchCredentials();
  }, []);

  // Export skills
  const handleExport = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/export-skills", {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `skills_${user?.name || "user"}.xlsx`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Greška pri eksportu veština:", error);
      alert("Došlo je do greške pri eksportovanju fajla.");
    }
  };

  // Metričke vrednosti
  const totalSkills = skills.length;
  const totalCredentials = credentials.length;
  const avgLevel =
    skills.length > 0
      ? (
          skills.reduce((acc, s) => acc + (s.level || 0), 0) / skills.length
        ).toFixed(1)
      : 0;

  // Grafikon: broj kredencijala po veštini
  const credentialCountBySkill = skills.map((s) => {
    const count = credentials.filter(
      (c) => c.skill.name === s.skill.name
    ).length;
    return { skill: s.skill.name, count };
  });

  const chartData = {
    labels: credentialCountBySkill.map((s) => s.skill),
    datasets: [
      {
        label: "Broj kredencijala po veštini",
        data: credentialCountBySkill.map((s) => s.count),
        backgroundColor: "#a2185b",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Kredencijali po veštinama",
      },
    },
  };

  if (loading) return <p>Učitavanje podataka...</p>;

  return (
    <div className="user-home">

      <nav className="breadcrumbs">
      <Link to="/home">Home</Link> 
      </nav>

      <h1>Dobrodošla, {user?.name || "korisnice"}! 🌸</h1>
      <p className="intro-text">
        Na svom profilu možeš da upravljaš veštinama, dodaješ kredencijale,
        ažuriraš opis i preuzimaš svoje podatke u Excel formatu. 
      </p>

      {/* Sekcija za eksport */}
      <div className="export-section card">
        <h2> Izvezi svoje veštine</h2>
        <p>
          Preuzmi sve svoje veštine i nivoe u Excel fajlu. Ova funkcionalnost ti
          omogućava da lako deliš svoj napredak.
        </p>
        <button onClick={handleExport}>Izvezi veštine u Excel</button>
      </div>

      {/* Sekcija za metrike */}
      <div className="metrics">
        <div className="metric-card">
          <h2>{totalSkills}</h2>
          <p>Ukupno veština</p>
        </div>
        <div className="metric-card">
          <h2>{totalCredentials}</h2>
          <p>Ukupno kredencijala</p>
        </div>
        <div className="metric-card">
          <h2>{avgLevel}</h2>
          <p>Prosečan nivo veština</p>
        </div>
      </div>

      {/* Grafikon */}
      <div className="chart-container card">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default Home;
