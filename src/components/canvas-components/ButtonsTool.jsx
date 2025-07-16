import React, { useContext } from "react";
import { ToolContext } from "../../context/ToolContext";
const ButtonsTool = () => {
  const { addShape } = useContext(ToolContext);

  const addShapeClick = (e, shape, types) => {
    addShape(shape, types);
  };

  return (
    <div className="toolContainer buttonsContainer">
      <div
        className="elementBlock"
        onClick={(e) => addShapeClick(e, "pointy", "ButtonTool")}
      >
        <button className="addButton pointy">Button</button>
      </div>
      <div
        className="elementBlock"
        onClick={(e) => addShapeClick(e, "Rounded", "ButtonTool")}
      >
        <button className="addButton Rounded">Button</button>
      </div>
      <div
        className="elementBlock"
        onClick={(e) => addShapeClick(e, "BlankBG", "ButtonTool")}
      >
        <button className="addButton BlankBG">Button</button>
      </div>
    </div>
  );
};

export default ButtonsTool;
