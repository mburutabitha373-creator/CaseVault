import "./App.css";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Cases from "./pages/Cases";
import Evidence from "./pages/Evidence";
import AddCase from "./pages/AddCase";
import AddEvidence from "./pages/AddEvidence";
import EditCase from "./pages/EditCase";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/cases" element={<Cases />} />
        <Route path="/evidence" element={<Evidence />} />
        <Route path="/add-case" element={<AddCase />} />
        <Route path="/add-evidence" element={<AddEvidence />} />
        <Route path="/edit-case/:id" element={<EditCase />} />
      </Routes>
    </>
  );
}

export default App;
