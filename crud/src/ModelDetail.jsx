import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "./supabase";

// Returns a redacted black bar of a given width
function Redacted({ width = "120px" }) {
  return <span className="redacted-block" style={{ width }} />;
}

// Maps class string to CSS class name
function getClassStyle(cls) {
  if (!cls) return "";
  const lower = cls.toLowerCase();
  if (lower.includes("keter")) return "keter";
  if (lower.includes("euclid")) return "euclid";
  if (lower.includes("safe")) return "safe";
  if (lower.includes("neutral")) return "neutralised";
  return "";
}

// Maps class to stamp text
function getStampText(cls) {
  if (!cls) return "CLASSIFIED";
  const lower = cls.toLowerCase();
  if (lower.includes("keter")) return "KETER";
  if (lower.includes("euclid")) return "EUCLID";
  if (lower.includes("safe")) return "SAFE";
  if (lower.includes("neutral")) return "NEUTRALISED";
  return "CLASSIFIED";
}

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

  if (!itemData) {
    return (
      <div className="loading">Retrieving classified file... please wait</div>
    );
  }

  return (
    <div>
      {/* Document header */}
      <div className="doc-header">
        <div className="doc-classification-top">
          ⚠ Top Secret — Level 4 Clearance Required — Authorised Personnel Only
          ⚠
        </div>
        <div className="doc-title-row">
          <div>
            <div className="doc-item-number">{itemData.item}</div>
            <div className={`doc-item-class ${getClassStyle(itemData.class)}`}>
              Object Class: {itemData.class}
            </div>
          </div>
          <div className="doc-stamp">{getStampText(itemData.class)}</div>
        </div>
      </div>

      {/* Document body */}
      <div className="doc-body">
        {/* Metadata fields */}
        <div className="doc-field">
          <span className="doc-field-label">Item No</span>
          <span className="doc-field-value">{itemData.item}</span>
        </div>
        <div className="doc-field">
          <span className="doc-field-label">Object Class</span>
          <span className="doc-field-value">{itemData.class}</span>
        </div>
        <div className="doc-field">
          <span className="doc-field-label">Site Assigned</span>
          <span className="doc-field-value">
            Site-
            <Redacted width="48px" /> —{" "}
            <span className="redacted">REDACTED LOCATION DATA</span>
          </span>
        </div>
        <div className="doc-field">
          <span className="doc-field-label">Lead Researcher</span>
          <span className="doc-field-value">
            <span className="redacted">DR. FIRSTNAME LASTNAME</span>
          </span>
        </div>
        <div className="doc-field">
          <span className="doc-field-label">Date of Entry</span>
          <span className="doc-field-value">
            <Redacted width="80px" /> / <Redacted width="40px" /> /{" "}
            <Redacted width="40px" />
          </span>
        </div>

        {/* Photographic evidence */}
        {itemData.image && (
          <div className="doc-image-wrapper" data-file={`${itemData.item}-001`}>
            <img src={itemData.image} alt={itemData.item} />
          </div>
        )}
        {!itemData.image && (
          <div className="no-image">
            [ Photographic evidence — file sealed — clearance insufficient ]
          </div>
        )}

        {/* Containment procedures */}
        <div className="containment-box">
          <p>{itemData.containment}</p>
        </div>

        {/* Description */}
        <div className="description-section">
          <h3>Description</h3>
          <p>{itemData.description}</p>
        </div>
      </div>
    </div>
  );
}

export default ModelDetail;
