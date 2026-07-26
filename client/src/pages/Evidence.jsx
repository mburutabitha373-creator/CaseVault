import { useEffect, useState } from "react";
import api from "../services/api";

function Evidence() {
  const [evidence, setEvidence] = useState([]);

  useEffect(() => {
    fetchEvidence();
  }, []);

  async function fetchEvidence() {
    try {
      const response = await api.get("/evidence");
      setEvidence(response.data);
    } catch (error) {
      console.error("Error fetching evidence:", error);
    }
  }

  return (
    <div className="container">
      <h1 className="page-title">Evidence</h1>

      {evidence.map((item) => (
        <div className="card" key={item.id}>
          <h2>{item.name}</h2>

          <p>
            <strong>Type:</strong> {item.evidence_type}
          </p>

          <p>
            <strong>Description:</strong> {item.description}
          </p>

          <p>
            <strong>Secured:</strong>{" "}
            {item.secured ? "Yes" : "No"}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Evidence;