import { BrowserRouter as Router, Routes, Route } from "react-router";
import NavMenu from "./NavMenu";
import ModelDetail from "./ModelDetail";
import AdminPanel from "./AdminPanel";
import "./scp.css";

function HomePage() {
  return (
    <div className="home-wrapper">
      <div className="home-emblem">☣</div>
      <h1 className="home-title">SCP Foundation</h1>
      <p className="home-subtitle">Secure · Contain · Protect</p>
      <hr className="home-divider" />
      <div className="home-warning">
        <p>
          ⚠ CLASSIFIED DOCUMENT ACCESS PORTAL ⚠<br />
          LEVEL 4 CLEARANCE REQUIRED
          <br />
          UNAUTHORISED ACCESS IS A VIOLATION OF O5 DIRECTIVE 7-A
        </p>
      </div>
      <p className="home-instruction">
        Select a subject designation from the <span>navigation index</span>{" "}
        above
        <br />
        to access its classified containment file.
      </p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <div className="main-content">
          <NavMenu />
          {/* This div grows to fill available space, pushing footer down */}
          <div className="page-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/model/:id" element={<ModelDetail />} />
              <Route path="/admin" element={<AdminPanel />} />
            </Routes>
          </div>
          <div className="doc-footer">
            <span className="doc-footer-text">
              SCP Foundation — Internal Use Only
            </span>
            <span className="doc-classification-bottom">Top Secret</span>
            <span className="doc-footer-text">O5 Eyes Only</span>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
