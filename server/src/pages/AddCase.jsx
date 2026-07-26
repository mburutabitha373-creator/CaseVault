import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AddCase() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    case_number: "",
    title: "",
    crime_type: "",
    status: "Open",
    opened_date: "",
    lead_investigator: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await api.post("/cases", formData);
      alert("Case added successfully!");
      navigate("/cases");
    } catch (error) {
      console.error(error);
      alert("Failed to add case.");
    }
  }

  return (
    <div className="container">
      <h1>Add Case</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="case_number"
          placeholder="Case Number"
          value={formData.case_number}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="crime_type"
          placeholder="Crime Type"
          value={formData.crime_type}
          onChange={handleChange}
          required
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option>Open</option>
          <option>Under Investigation</option>
          <option>Closed</option>
        </select>

        <input
          type="date"
          name="opened_date"
          value={formData.opened_date}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="lead_investigator"
          placeholder="Lead Investigator"
          value={formData.lead_investigator}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Case</button>
      </form>
    </div>
  );
}

export default AddCase;