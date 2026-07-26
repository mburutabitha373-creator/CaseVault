import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function EditCase() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    case_number: "",
    title: "",
    crime_type: "",
    status: "",
    opened_date: "",
    lead_investigator: "",
  });

  useEffect(() => {
    fetchCase();
  }, []);

  async function fetchCase() {
    try {
      const response = await api.get(`/cases/${id}`);
      setFormData(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load case.");
    }
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await api.patch(`/cases/${id}`, formData);
      alert("Case updated successfully!");
      navigate("/cases");
    } catch (error) {
      console.error(error);
      alert("Failed to update case.");
    }
  }

  return (
    <div className="container">
      <h1>Edit Case</h1>

      <form onSubmit={handleSubmit}>
        <label>Case Number</label>
        <input
          type="text"
          name="case_number"
          value={formData.case_number}
          onChange={handleChange}
        />

        <label>Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />

        <label>Crime Type</label>
        <input
          type="text"
          name="crime_type"
          value={formData.crime_type}
          onChange={handleChange}
        />

        <label>Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Open">Open</option>
          <option value="Under Investigation">Under Investigation</option>
          <option value="Closed">Closed</option>
        </select>

        <label>Opened Date</label>
        <input
          type="date"
          name="opened_date"
          value={formData.opened_date}
          onChange={handleChange}
        />

        <label>Lead Investigator</label>
        <input
          type="text"
          name="lead_investigator"
          value={formData.lead_investigator}
          onChange={handleChange}
        />

        <button type="submit">Update Case</button>
      </form>
    </div>
  );
}

export default EditCase;
