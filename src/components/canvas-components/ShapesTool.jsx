import React, { useContext } from "react";
import { ToolContext } from "../../context/ToolContext";

const ShapesTool = () => {
  const { addShape } = useContext(ToolContext);

  const addShapeClick = (shape, types) => {
    addShape(shape, types);
  };

  return (
    <div className="toolContainer">
      <div
        className="elementBlock addSquare"
        onClick={() => addShapeClick("square", "shape")}
      ></div>
      <div
        className="elementBlock addCircle"
        onClick={() => addShapeClick("circle", "shape")}
      ></div>
      <div
        className="elementBlock addTriangle"
        onClick={() => addShapeClick("triangle", "shape")}
      ></div>
      <div
        className="elementBlock addSquareBordered"
        onClick={() => addShapeClick("squareBordered", "shape")}
      ></div>
    </div>
  );
};

export default ShapesTool;
