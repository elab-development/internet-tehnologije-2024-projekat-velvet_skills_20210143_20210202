import React, { useEffect, useState } from "react";
import axios from "axios";
import ReusableTable from "../reusable/ReusableTable";

const UserSkillsManager = () => {
  const [skills, setSkills] = useState([]);
  const [availableSkills, setAvailableSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [loading, setLoading] = useState(true);
  const token = JSON.parse(sessionStorage.getItem("user"))?.token;

  // Učitavanje korisnikovih veština
  const fetchSkills = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/skills", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSkills(response.data.data);
    } catch (error) {
      console.error("Greška pri dohvatanju veština:", error);
    } finally {
      setLoading(false);
    }
  };

  // Učitavanje dostupnih veština za dodavanje
  const fetchAvailableSkills = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/skills/unselected",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAvailableSkills(response.data.data);
    } catch (error) {
      console.error("Greška pri dohvatanju dostupnih veština:", error);
    }
  };

  // Dodavanje nove veštine
  const handleAddSkill = async () => {
    if (!selectedSkill) return alert("Izaberi veštinu za dodavanje.");
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/skills/add",
        { skill_name: selectedSkill },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Veština uspešno dodata!");
      setSelectedSkill("");
      fetchSkills();
      fetchAvailableSkills();
    } catch (error) {
      alert("Greška pri dodavanju veštine.");
      console.error(error);
    }
  };

  // Brisanje veštine
  const handleDelete = async (row) => {
    if (!window.confirm(`Obrisati veštinu "${row.name}"?`)) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/api/skills/${row.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchSkills();
    } catch (error) {
      console.error("Greška pri brisanju veštine:", error);
    }
  };

  // Ažuriranje nivoa (inline)
  const handleEdit = async (row) => {
    const newLevel = prompt(
      `Unesi novi nivo za ${row.name} (1–5):`,
      row.level
    );
    if (!newLevel || isNaN(newLevel) || newLevel < 1 || newLevel > 5) {
      alert("Nevažeći nivo. Dozvoljeni opseg je 1–5.");
      return;
    }

    try {
      await axios.put(
        `http://127.0.0.1:8000/api/skills/${row.id}`,
        { level: Number(newLevel) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Nivo veštine uspešno ažuriran!");
      fetchSkills();
    } catch (error) {
      console.error("Greška pri ažuriranju veštine:", error);
    }
  };

  useEffect(() => {
    fetchSkills();
    fetchAvailableSkills();
  }, []);

  // Kolone za tabelu
  const columns = [
    { key: "name", label: "Naziv veštine" },
    { key: "category", label: "Kategorija" },
    { key: "level", label: "Nivo" },
    { key: "status", label: "Status" },
  ];

  // Transformiši podatke u oblik koji tabela očekuje
  const tableData = skills.map((s) => ({
    id: s.id,
    name: s.skill.name,
    category: s.skill.category,
    level: s.level,
    status: s.status,
  }));

  // Akcije za tabelu
  const actions = [
    {
      label: "Uredi",
      className: "btn-edit",
      onClick: handleEdit,
    },
    {
      label: "Obriši",
      className: "btn-delete",
      onClick: handleDelete,
    },
  ];

  return (
    <div className="skills-section">
      <h2>Moje Veštine</h2>

      {/* Forma za dodavanje nove veštine */}
      <div className="card add-skill-form">
        <select
          value={selectedSkill}
          onChange={(e) => setSelectedSkill(e.target.value)}
        >
          <option value="">Izaberi veštinu</option>
          {availableSkills.map((s) => (
            <option key={s.id} value={s.name}>
              {s.name} ({s.category})
            </option>
          ))}
        </select>
        <button onClick={handleAddSkill}> Dodaj veštinu</button>
      </div>

      {/* Tabela veština */}
      {loading ? (
        <p>Učitavanje veština...</p>
      ) : (
        <ReusableTable columns={columns} data={tableData} actions={actions} />
      )}
    </div>
  );
};

export default UserSkillsManager;
