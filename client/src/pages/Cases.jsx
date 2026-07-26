import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Cases() {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    fetchCases();
  }, []);

  async function fetchCases() {
    try {
      const response = await api.get("/cases");
      setCases(response.data);
    } catch (error) {
      console.error("Error fetching cases:", error);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this case?")) return;

    try {
      await api.delete(`/cases/${id}`);
      fetchCases();
    } catch (error) {
      console.error(error);
      alert("Failed to delete case.");
    }
  }

  function statusClass(status) {
    if (status === "Open") return "status open";
    if (status === "Under Investigation") return "status investigating";
    return "status closed";
  }

  return (
    <div className="container">
      <h1>Cases</h1>

      {cases.map((item) => (
        <div className="card" key={item.id}>
          <h2>{item.title}</h2>

          <p>
            <strong>Case #:</strong> {item.case_number}
          </p>

          <p>
            <strong>Crime:</strong> {item.crime_type}
          </p>

          <p>
            <strong>Lead Investigator:</strong>{" "}
            {item.lead_investigator}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            <span className={statusClass(item.status)}>
              {item.status}
            </span>
          </p>

          <div className="actions">
            <Link to={`/edit-case/${item.id}`}>
              <button>Edit</button>
            </Link>

            <button
              className="delete-btn"
              onClick={() => handleDelete(item.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cases;