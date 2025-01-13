import React, { useContext } from "react";
import { ToolContext } from "../../context/ToolContext";

const ShapesTool = () => {
  const { addShape } = useContext(ToolContext);

  const addShapeClick = (shape) => {
    addShape(shape);
  };

  return (
    <div className="toolContainer">
      <div
        className="elementBlock addSquare"
        onClick={() => addShapeClick("square")}
      ></div>
      <div
        className="elementBlock addCircle"
        onClick={() => addShapeClick("circle")}
      ></div>
      <div
        className="elementBlock addTriangle"
        onClick={() => addShapeClick("triangle")}
      ></div>
      <div
        className="elementBlock addSquareBordered"
        onClick={() => addShapeClick("squareBordered")}
      ></div>
    </div>
  );
};

export default ShapesTool;
