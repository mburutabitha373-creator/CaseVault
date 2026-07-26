import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AddEvidence() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    evidence_type: "",
    description: "",
    secured: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/evidence", formData);
      alert("Evidence added successfully!");
      navigate("/evidence");
    } catch (error) {
      console.error(error);
      alert("Failed to add evidence.");
    }
  };

  return (
    <div className="page">
      <h1>Add Evidence</h1>

      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Evidence Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="evidence_type"
          placeholder="Evidence Type"
          value={formData.evidence_type}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          rows="4"
          value={formData.description}
          onChange={handleChange}
        />

        <label>
          <input
            type="checkbox"
            name="secured"
            checked={formData.secured}
            onChange={handleChange}
          />
          Secured
        </label>

        <button type="submit">Add Evidence</button>
      </form>
    </div>
  );
}

export default AddEvidence;