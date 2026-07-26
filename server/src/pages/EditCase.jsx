import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
        <input
          type="text"
          name="case_number"
          value={formData.case_number}
          onChange={handleChange}
        />

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />

        <input
          type="text"
          name="crime_type"
          value={formData.crime_type}
          onChange={handleChange}
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Open">Open</option>
          <option value="Under Investigation">Under Investigation</option>
          <option value="Closed">Closed</option>
        </select>

        <input
          type="date"
          name="opened_date"
          value={formData.opened_date}
          onChange={handleChange}
        />

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