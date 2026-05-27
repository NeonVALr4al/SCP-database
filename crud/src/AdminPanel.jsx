import { useState, useEffect } from "react";
import { supabase } from "./supabase";

function AdminPanel() {
  const [items, setItems] = useState([]);
  const [newRecord, setNewRecord] = useState({
    item: "",
    class: "",
    description: "",
    image: "",
    containment: "",
  });
  const [editRecord, setEditRecord] = useState(null);

  useEffect(() => {
    const fetchModels = async () => {
      const { data, error } = await supabase.from("SCP").select("*");
      if (error) {
        console.error(error);
      } else {
        setItems(data);
      }
    };
    fetchModels();
  }, []);

  const addRecord = async () => {
    await supabase.from("SCP").insert([newRecord]);
    setNewRecord({ item: "", class: "", description: "", image: "", containment: "" });
    window.location.reload();
  };

  const deleteRecord = async (id) => {
    await supabase.from("SCP").delete().eq("id", id);
    window.location.reload();
  };

  const startEditing = (item) => setEditRecord(item);

  const saveEdit = async (id) => {
    await supabase.from("SCP").update(editRecord).eq("id", id);
    setEditRecord(null);
    window.location.reload();
  };

  return (
    <div className="admin-wrapper">
      <div className="admin-header">
        Personnel Admin Access
        <span>⚠ Authorised Personnel Only — All Actions Are Logged</span>
      </div>

      {/* Records list */}
      {items.map((item) => (
        <div className="admin-record" key={item.id}>
          {editRecord && editRecord.id === item.id ? (
            <div className="edit-form">
              <input className="admin-input" value={editRecord.item}
                onChange={(e) => setEditRecord({ ...editRecord, item: e.target.value })}
                placeholder="Item designation (e.g. SCP-173)" />
              <input className="admin-input" value={editRecord.class}
                onChange={(e) => setEditRecord({ ...editRecord, class: e.target.value })}
                placeholder="Object class (Safe / Euclid / Keter)" />
              <input className="admin-input" value={editRecord.containment}
                onChange={(e) => setEditRecord({ ...editRecord, containment: e.target.value })}
                placeholder="Containment procedures" />
              <input className="admin-input" value={editRecord.description}
                onChange={(e) => setEditRecord({ ...editRecord, description: e.target.value })}
                placeholder="Description" />
              <input className="admin-input" value={editRecord.image}
                onChange={(e) => setEditRecord({ ...editRecord, image: e.target.value })}
                placeholder="Image URL" />
              <div className="admin-actions">
                <button className="btn btn-save" onClick={() => saveEdit(item.id)}>✓ Save Record</button>
                <button className="btn btn-cancel" onClick={() => setEditRecord(null)}>✕ Cancel</button>
              </div>
            </div>
          ) : (
            <>
              <div className="admin-record-title">{item.item}</div>
              <div className="admin-record-meta">Object Class: {item.class}</div>
              <div className="admin-record-desc">{item.description}</div>
              <div className="admin-actions">
                <button className="btn btn-edit" onClick={() => startEditing(item)}>Edit File</button>
                <button className="btn btn-delete" onClick={() => deleteRecord(item.id)}>Terminate Record</button>
              </div>
            </>
          )}
        </div>
      ))}

      {/* Add new record */}
      <div className="add-record-section">
        <div className="add-record-header">▸ Register New Subject</div>
        <div className="add-form">
          <div className="form-row">
            <input className="admin-input" value={newRecord.item}
              onChange={(e) => setNewRecord({ ...newRecord, item: e.target.value })}
              placeholder="Item designation (e.g. SCP-999)" />
            <input className="admin-input" value={newRecord.class}
              onChange={(e) => setNewRecord({ ...newRecord, class: e.target.value })}
              placeholder="Object class" />
          </div>
          <input className="admin-input" value={newRecord.containment}
            onChange={(e) => setNewRecord({ ...newRecord, containment: e.target.value })}
            placeholder="Special containment procedures" />
          <input className="admin-input" value={newRecord.description}
            onChange={(e) => setNewRecord({ ...newRecord, description: e.target.value })}
            placeholder="Subject description" />
          <input className="admin-input" value={newRecord.image}
            onChange={(e) => setNewRecord({ ...newRecord, image: e.target.value })}
            placeholder="Photographic evidence URL" />
          <button className="btn btn-add" onClick={addRecord}>
            + Register Subject to Foundation Database
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;