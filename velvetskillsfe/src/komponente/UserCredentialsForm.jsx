import React, { useEffect, useState } from "react";
import axios from "axios";

const UserCredentialsForm = ({ onAdded }) => {
  const [form, setForm] = useState({
    skill_name: "",
    title: "",
    type: "",
    issue_date: "",
    expiry_date: "",
    file: "",
  });
  const [availableSkills, setAvailableSkills] = useState([]);
  const token = JSON.parse(sessionStorage.getItem("user"))?.token;

  // 🔹 Dohvati korisnikove veštine
  const fetchUserSkills = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/skills", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // backend vraća { data: [ { skill: { name } } ] } — uzimamo samo imena
      setAvailableSkills(response.data.data.map((s) => s.skill.name));
    } catch (error) {
      console.error("Greška pri dohvatanju veština:", error);
    }
  };

  // 🔹 Dodaj kredencijal
  const handleAddCredential = async (e) => {
    e.preventDefault();

    if (!form.skill_name || !form.title || !form.type || !form.file) {
      alert("Popuni sva obavezna polja.");
      return;
    }

    try {
      await axios.post("http://127.0.0.1:8000/api/credentials", form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Kredencijal uspešno dodat!");
      setForm({
        skill_name: "",
        title: "",
        type: "",
        issue_date: "",
        expiry_date: "",
        file: "",
      });

      if (onAdded) onAdded(); // obaveštava roditelja (Profile) da osveži listu
    } catch (error) {
      console.error("Greška pri dodavanju kredencijala:", error);
      alert("Došlo je do greške pri dodavanju kredencijala.");
    }
  };

  useEffect(() => {
    fetchUserSkills();
  }, []);

  return (
    <div className="card add-credential-form">
      <h2>Dodaj novi kredencijal</h2>
      <form onSubmit={handleAddCredential}>
        <select
          value={form.skill_name}
          onChange={(e) => setForm({ ...form, skill_name: e.target.value })}
        >
          <option value="">Izaberi veštinu</option>
          {availableSkills.map((name, index) => (
            <option key={index} value={name}>
              {name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Naziv kredencijala"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Tip (npr. Sertifikat, Diploma...)"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        />
        <input
          type="date"
          value={form.issue_date}
          onChange={(e) => setForm({ ...form, issue_date: e.target.value })}
        />
        <input
          type="date"
          value={form.expiry_date}
          onChange={(e) => setForm({ ...form, expiry_date: e.target.value })}
        />
        <input
          type="url"
          placeholder="Link ka dokumentu (slika ili PDF)"
          value={form.file}
          onChange={(e) => setForm({ ...form, file: e.target.value })}
        />
        <button type="submit">Dodaj kredencijal</button>
      </form>
    </div>
  );
};

export default UserCredentialsForm;
