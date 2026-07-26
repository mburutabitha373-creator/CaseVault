import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        🛡️ <span>CaseVault</span>
      </div>

      <div className="nav-links">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "active-link" : ""
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/cases"
          className={({ isActive }) =>
            isActive ? "active-link" : ""
          }
        >
          Cases
        </NavLink>

        <NavLink
          to="/evidence"
          className={({ isActive }) =>
            isActive ? "active-link" : ""
          }
        >
          Evidence
        </NavLink>

        <NavLink
          to="/add-case"
          className={({ isActive }) =>
            isActive ? "active-link" : ""
          }
        >
          Add Case
        </NavLink>

        <NavLink
          to="/add-evidence"
          className={({ isActive }) =>
            isActive ? "active-link" : ""
          }
        >
          Add Evidence
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
