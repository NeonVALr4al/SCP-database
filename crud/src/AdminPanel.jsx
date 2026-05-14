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
    setNewRecord({
      item: "",
      class: "",
      description: "",
      image: "",
      containment: "",
    });
    window.location.reload();
  };

  const deleteRecord = async (id) => {
    await supabase.from("SCP").delete().eq("id", id);
    window.location.reload();
  };

  const startEditing = (item) => {
    setEditRecord(item);
  };

  const saveEdit = async (id) => {
    await supabase.from("SCP").update(editRecord).eq("id", id);
    setEditRecord(null);
    window.location.reload();
  };

  return (
    <div>
      <h1>Admin Section</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {editRecord && editRecord.id === item.id ? (
              <div>
                <input
                  value={editRecord.item}
                  onChange={(e) =>
                    setEditRecord({ ...editRecord, item: e.target.value })
                  }
                />
                <input
                  value={editRecord.class}
                  onChange={(e) =>
                    setEditRecord({ ...editRecord, class: e.target.value })
                  }
                />
                <input
                  value={editRecord.description}
                  onChange={(e) =>
                    setEditRecord({
                      ...editRecord,
                      description: e.target.value,
                    })
                  }
                />
                <input
                  value={editRecord.image}
                  onChange={(e) =>
                    setEditRecord({ ...editRecord, image: e.target.value })
                  }
                />
                <input
                  value={editRecord.containment}
                  onChange={(e) =>
                    setEditRecord({
                      ...editRecord,
                      containment: e.target.value,
                    })
                  }
                />
                <button onClick={() => saveEdit(item.id)}>Save</button>
                <button onClick={() => setEditRecord(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <p>{item.item}</p>
                <p>{item.class}</p>
                <p>{item.description}</p>
                <p>{item.containment}</p>
                <button onClick={() => startEditing(item)}>Edit</button>
                <button onClick={() => deleteRecord(item.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>

      <h2>Add New Record</h2>
      <input
        value={newRecord.item}
        onChange={(e) => setNewRecord({ ...newRecord, item: e.target.value })}
        placeholder="Item"
      />
      <input
        value={newRecord.class}
        onChange={(e) => setNewRecord({ ...newRecord, class: e.target.value })}
        placeholder="Class"
      />
      <input
        value={newRecord.description}
        onChange={(e) =>
          setNewRecord({ ...newRecord, description: e.target.value })
        }
        placeholder="Description"
      />
      <input
        value={newRecord.image}
        onChange={(e) => setNewRecord({ ...newRecord, image: e.target.value })}
        placeholder="Image URL"
      />
      <input
        value={newRecord.containment}
        onChange={(e) =>
          setNewRecord({ ...newRecord, containment: e.target.value })
        }
        placeholder="Containment"
      />
      <button onClick={addRecord}>Add Record</button>
    </div>
  );
}

export default AdminPanel;
