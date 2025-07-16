import React from "react";
let newShape = [];

const PullShapeData = async (onFoundShape) => {
  try {
    const getRes = await fetch(`http://localhost:5000/api/popups/`);
    if (getRes.ok) {
      const data = await getRes.json();
      const serverShape = data;
      if (onFoundShape) {
        return onFoundShape([serverShape]);
      }
    }
  } catch (error) {
    console.error("Error saving/updating shape:", error);
  }
};

export default PullShapeData;
