import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "./supabase";

function ModelDetail() {
  const { id } = useParams();
  const [itemData, setItemData] = useState(null);

  useEffect(() => {
    const fetchModelDetails = async () => {
      const { data, error } = await supabase
        .from("SCP")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        console.error(error);
      } else {
        setItemData(data);
      }
    };
    fetchModelDetails();
  }, [id]);

  return (
    <div>
      {itemData ? (
        <>
          <h1>{itemData.item}</h1>
          <h2>{itemData.class}</h2>
          <p>{itemData.containment}</p>
          <p>
            <img src={itemData.image} alt={itemData.item} />
          </p>
          <p>{itemData.description}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ModelDetail;
