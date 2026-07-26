import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Cases() {
  const [cases, setCases] = useState([]);

  async function fetchCases() {
    try {
      const response = await api.get("/cases");
      setCases(response.data);
    } catch (error) {
      console.error("Error fetching cases:", error);
    }
  }

  useEffect(() => {
    fetchCases();
  }, []);

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this case?"
    );

    if (!confirmed) return;

    try {
      await api.delete(`/cases/${id}`);
      setCases(cases.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting case:", error);
      alert("Failed to delete case.");
    }
  }

  return (
    <div className="container">
      <h1>Cases</h1>

      {cases.length === 0 ? (
        <p>No cases found.</p>
      ) : (
        cases.map((item) => (
          <div key={item.id} className="card">
            <h2>{item.title}</h2>

            <p>
              <strong>Case Number:</strong> {item.case_number}
            </p>

            <p>
              <strong>Crime Type:</strong> {item.crime_type}
            </p>

            <p>
              <strong>Status:</strong> {item.status}
            </p>

            <p>
              <strong>Lead Investigator:</strong>{" "}
              {item.lead_investigator}
            </p>

            <div style={{ marginTop: "15px" }}>
              <Link to={`/edit-case/${item.id}`}>
                <button>Edit</button>
              </Link>

              <button
                onClick={() => handleDelete(item.id)}
                style={{ marginLeft: "10px" }}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Cases;