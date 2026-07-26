import { useEffect, useState } from "react";
import api from "../services/api";

function Evidence() {
  const [evidence, setEvidence] = useState([]);

  async function fetchEvidence() {
    try {
      const response = await api.get("/evidence");
      setEvidence(response.data);
    } catch (error) {
      console.error("Error fetching evidence:", error);
    }
  }

  useEffect(() => {
    fetchEvidence();
  }, []);

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this evidence?"
    );

    if (!confirmed) return;

    try {
      await api.delete(`/evidence/${id}`);
      setEvidence(evidence.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting evidence:", error);
      alert("Failed to delete evidence.");
    }
  }

  return (
    <div className="container">
      <h1>Evidence</h1>

      {evidence.length === 0 ? (
        <p>No evidence found.</p>
      ) : (
        evidence.map((item) => (
          <div key={item.id} className="card">
            <h2>{item.name}</h2>

            <p>
              <strong>Type:</strong> {item.evidence_type}
            </p>

            <p>
              <strong>Description:</strong> {item.description}
            </p>

            <p>
              <strong>Secured:</strong> {item.secured ? "Yes" : "No"}
            </p>

            <button onClick={() => handleDelete(item.id)}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Evidence;