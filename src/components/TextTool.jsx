import React, { useContext } from "react";
import { ToolContext } from "../context/ToolContext";

const TextTool = () => {
  const { addShape } = useContext(ToolContext);

  const addShapeClick = (e, shape, types) => {
    addShape(shape, types);
  };

  return (
    <div className="toolContainer textContainer">
      <div
        className="elementBlock"
        onClick={(e) => addShapeClick(e, "Poppins", "TextTool")}
      >
        <span className="addText Poppins">Hello World</span>
      </div>
      <div
        className="elementBlock"
        onClick={(e) => addShapeClick(e, "fantasy", "TextTool")}
      >
        <span className="addText fantasy">Hello World</span>
      </div>
      <div
        className="elementBlock"
        onClick={(e) => addShapeClick(e, "emoji", "TextTool")}
      >
        <span className="addText emoji">Hello World</span>
      </div>
      <div
        className="elementBlock"
        onClick={(e) => addShapeClick(e, "cursive", "TextTool")}
      >
        <span className="addText cursive">Hello World</span>
      </div>
    </div>
  );
};

export default TextTool;
