import React, { useContext } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { ToolContext } from "../../context/ToolContext";

const CloseTool = () => {
  const { addShape } = useContext(ToolContext);

  const addShapeClick = (e, shape, types) => {
    addShape(shape, types);
  };

  return (
    <div className="toolContainer">
      <div
        className="elementBlock"
        onClick={(e) => addShapeClick(e, "xInCircle", "closeTool")}
      >
        <IoIosCloseCircle className="closeIconTool" />
      </div>
      <div
        className="elementBlock"
        onClick={(e) => addShapeClick(e, "xShape", "closeTool")}
      >
        {" "}
        <IoCloseSharp className="closeIconTool" />
      </div>
    </div>
  );
};

export default CloseTool;
