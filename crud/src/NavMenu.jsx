import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "./supabase";

function NavMenu() {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchModels = async () => {
      const { data, error } = await supabase.from("SCP").select("id, item");
      if (error) {
        console.error(error);
      } else {
        setItems(data);
      }
    };
    fetchModels();
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Top bar */}
      <div className="nav-wrapper">
        <div className="nav-header">
          {/* Clicking the title goes back to homepage */}
          <Link to="/" className="nav-logo" onClick={closeMenu}>
            <span>SCP</span> Foundation — Subject Index
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span className="nav-clearance">Clearance Lvl 4</span>
            <button
              className="burger-btn"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation"
            >
              <span className={`burger-line ${isOpen ? "open-1" : ""}`} />
              <span className={`burger-line ${isOpen ? "open-2" : ""}`} />
              <span className={`burger-line ${isOpen ? "open-3" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && <div className="nav-overlay" onClick={closeMenu} />}

      {/* Slide-out drawer */}
      <div className={`nav-drawer ${isOpen ? "nav-drawer-open" : ""}`}>
        <div className="nav-drawer-header">
          <span className="nav-drawer-title">Subject Index</span>
          <button className="nav-drawer-close" onClick={closeMenu}>
            ✕
          </button>
        </div>
        <div className="nav-drawer-classification">
          CLASSIFIED — AUTHORISED ACCESS ONLY
        </div>
        <ul className="nav-drawer-links">
          {items.map((item) => (
            <li key={item.id}>
              <Link to={`/model/${item.id}`} onClick={closeMenu}>
                <span className="nav-drawer-arrow">▸</span>
                {item.item}
              </Link>
            </li>
          ))}
        </ul>
        <div className="nav-drawer-footer">
          <Link to="/admin" onClick={closeMenu} className="nav-drawer-admin">
            ⚙ Admin Access
          </Link>
        </div>
      </div>
    </>
  );
}

export default NavMenu;
