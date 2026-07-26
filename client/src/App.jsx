import "./App.css";
import { Navigate, Routes, Route, useLocation } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Navbar from "./components/Navbar";
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

  const isAuthenticated = () => {
    const storedUser = localStorage.getItem("casevault_user");
    return Boolean(storedUser && storedUser !== "null");
  };

  const ProtectedRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/login" replace />;
  };

  return (
    <>
      {!isAuthPage && <Navbar />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/cases" element={<ProtectedRoute><Cases /></ProtectedRoute>} />
        <Route path="/evidence" element={<ProtectedRoute><Evidence /></ProtectedRoute>} />
        <Route path="/add-case" element={<ProtectedRoute><AddCase /></ProtectedRoute>} />
        <Route path="/add-evidence" element={<ProtectedRoute><AddEvidence /></ProtectedRoute>} />
        <Route path="/edit-case/:id" element={<ProtectedRoute><EditCase /></ProtectedRoute>} />
      </Routes>
    </>
  );
}

export default App;
