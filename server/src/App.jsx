import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Dashboard from "./pages/Dashboard";
import Cases from "./pages/Cases";
import Evidence from "./pages/Evidence";
import AddCase from "./pages/AddCase";
import AddEvidence from "./pages/AddEvidence";
import EditCase from "./pages/EditCase";

function App() {
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <>
      {!isAuthPage && <Navbar />}

      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/cases" element={<Cases />} />
          <Route path="/evidence" element={<Evidence />} />
          <Route path="/add-case" element={<AddCase />} />
          <Route path="/add-evidence" element={<AddEvidence />} />
          <Route path="/edit-case/:id" element={<EditCase />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
