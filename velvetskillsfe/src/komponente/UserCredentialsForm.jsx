import React, { useEffect, useState } from "react";
import axios from "axios";

const UserCredentialsForm = ({ onAdded, refreshSkills }) => {
  const [form, setForm] = useState({
    skill_name: "",
    title: "",
    type: "",
    issue_date: "",
    expiry_date: "",
    file: "",
  });
  const [availableSkills, setAvailableSkills] = useState([]);
  const [uploading, setUploading] = useState(false);

  const token = JSON.parse(sessionStorage.getItem("user"))?.token;
  const IMGBB_API_KEY = process.env.REACT_APP_IMGBB_API_KEY;

  // Dohvati korisnikove veštine
  const fetchUserSkills = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/skills", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAvailableSkills(response.data.data.map((s) => s.skill.name));
    } catch (error) {
      console.error("Greška pri dohvatanju veština:", error);
    }
  };

  // Upload slike na ImgBB (pretvara fajl u link)
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        formData
      );

      const imageUrl = response.data.data.url;
      setForm((prev) => ({ ...prev, file: imageUrl }));
      alert("Slika uspešno uploadovana!");
    } catch (error) {
      console.error("Greška pri uploadu slike:", error);
      alert("Došlo je do greške pri uploadu slike.");
    } finally {
      setUploading(false);
    }
  };

  // Kad korisnik izabere issue_date → expiry_date se postavlja +1 godina
  const handleIssueDateChange = (e) => {
    const selectedDate = e.target.value;
    if (!selectedDate) return;

    const nextYear = new Date(selectedDate);
    nextYear.setFullYear(nextYear.getFullYear() + 1);

    // Format YYYY-MM-DD
    const formattedNextYear = nextYear.toISOString().split("T")[0];

    setForm((prev) => ({
      ...prev,
      issue_date: selectedDate,
      expiry_date: formattedNextYear,
    }));
  };

  // Dodaj novi kredencijal
  const handleAddCredential = async (e) => {
    e.preventDefault();

    if (!form.skill_name || !form.title || !form.type || !form.file) {
      alert("Popuni sva obavezna polja i uploaduj sliku.");
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

      if (onAdded) onAdded();
    } catch (error) {
      console.error("Greška pri dodavanju kredencijala:", error);
      alert("Došlo je do greške pri dodavanju kredencijala.");
    }
  };

  // Refresh veština kad se doda nova
  useEffect(() => {
    fetchUserSkills();
  }, [refreshSkills]);

  return (
    <div className="card add-credential-form">
      <h2>Dodaj novi kredencijal</h2>
      <form onSubmit={handleAddCredential}>
        {/* Veština */}
        <select
          value={form.skill_name}
          onChange={(e) => setForm({ ...form, skill_name: e.target.value })}
        >
          <option value="">Izaberi veštinu</option>
          {availableSkills.length > 0 ? (
            availableSkills.map((name, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))
          ) : (
            <option disabled>Nema dostupnih veština</option>
          )}
        </select>

        {/* Naziv i tip */}
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

        {/* Datumi */}
        <input
          type="date"
          value={form.issue_date}
          onChange={handleIssueDateChange}
        />

        <input
          type="date"
          value={form.expiry_date}
          onChange={(e) =>
            setForm({ ...form, expiry_date: e.target.value })
          }
        />

        {/* Upload slike */}
        <label className="file-upload-label">
          <span>Izaberi sliku kredencijala</span>
          <input type="file" accept="image/*" onChange={handleFileUpload} />
        </label>

        {uploading ? (
          <p>Upload slike u toku...</p>
        ) : form.file ? (
          <div className="uploaded-preview">
            <img src={form.file} alt="Preview" className="preview-image" />
          </div>
        ) : null}

        <button type="submit" disabled={uploading}>
          {uploading ? "Sačekaj..." : "Dodaj kredencijal"}
        </button>
      </form>
    </div>
  );
};

export default UserCredentialsForm;
