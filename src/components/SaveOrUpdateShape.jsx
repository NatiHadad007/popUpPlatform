import React from "react";
let newShape = [];

const saveOrUpdateShape = async (shapeId, shapeData) => {
  try {
    const res = await fetch(`http://localhost:5000/api/popups/${shapeId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: shapeId, ...shapeData }),
    });
    if (!res.ok) {
      // Shape not found on server — create new
      const postRes = await fetch("http://localhost:5000/api/popups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: shapeId, ...shapeData }),
      });

      const createdShape = await postRes.json();
      newShape.push(createdShape);
      console.log("Shape created:", createdShape);
    } else {
      const updatedShape = await res.json();
      console.log("Shape updated on server:", updatedShape);
    }
  } catch (error) {
    console.error("Error saving/updating shape:", error);
  }
};

export default saveOrUpdateShape;
