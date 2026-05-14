import { BrowserRouter as Router, Routes, Route } from "react-router";
import NavMenu from "./NavMenu";
import ModelDetail from "./ModelDetail";
import AdminPanel from "./AdminPanel";

function App() {
  return (
    <Router>
      <NavMenu />
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h1>Welcome to the SCP Database</h1>
              <p>Click one of the links above to view content</p>
            </div>
          }
        />
        <Route path="/model/:id" element={<ModelDetail />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
