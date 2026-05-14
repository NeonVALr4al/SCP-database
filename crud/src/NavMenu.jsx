import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "./supabase";

function NavMenu() {
  const [items, setItems] = useState([]);

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

  return (
    <nav>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <Link to={`/model/${item.id}`}>{item.item}</Link>
          </li>
        ))}
        <li>
          <Link to="/admin">Admin Panel</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavMenu;
