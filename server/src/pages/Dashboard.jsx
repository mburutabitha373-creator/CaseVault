import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
  const [cases, setCases] = useState([]);
  const [evidence, setEvidence] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const casesRes = await api.get("/cases");
      const evidenceRes = await api.get("/evidence");

      setCases(casesRes.data);
      setEvidence(evidenceRes.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  }

  const openCases = cases.filter(
    (item) => item.status === "Open"
  ).length;

  const investigatingCases = cases.filter(
    (item) => item.status === "Under Investigation"
  ).length;

  const closedCases = cases.filter(
    (item) => item.status === "Closed"
  ).length;

  function statusClass(status) {
    if (status === "Open") return "status open";
    if (status === "Under Investigation")
      return "status investigating";
    return "status closed";
  }

  return (
    <div className="container">
      <div className="dashboard-header">
        <h1>CaseVault Dashboard</h1>
        <p>Monitor investigations and evidence in real time.</p>
      </div>

      <div className="stats-grid">
        <div className="card stat-card">
          <h3>Total Cases</h3>
          <h2>{cases.length}</h2>
        </div>

        <div className="card stat-card">
          <h3>Open Cases</h3>
          <h2>{openCases}</h2>
        </div>

        <div className="card stat-card">
          <h3>Under Investigation</h3>
          <h2>{investigatingCases}</h2>
        </div>

        <div className="card stat-card">
          <h3>Closed Cases</h3>
          <h2>{closedCases}</h2>
        </div>

        <div className="card stat-card">
          <h3>Evidence Items</h3>
          <h2>{evidence.length}</h2>
        </div>
      </div>

      <div className="card recent-cases">
        <h2>Recent Cases</h2>

        {cases.length === 0 ? (
          <p>No cases available.</p>
        ) : (
          cases.map((item) => (
            <div className="case-row" key={item.id}>
              <div>
                <strong>{item.case_number}</strong>
                <br />
                {item.title}
              </div>

              <span className={statusClass(item.status)}>
                {item.status}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;