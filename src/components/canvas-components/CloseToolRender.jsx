import React from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";

const CloseToolRender = ({ shape, shapePos }) => {
  if (!shape || shape.elementType !== "closeTool") return null;

  const commonStyle = {
    color: shape.color,
    zIndex: shape.ShapeLayer,
    opacity: shape.opacity || "",
    position: "absolute",
    width: `${shapePos.width}px`,
    height: `${shapePos.height}px`,
  };

  return shape.type === "xInCircle" ? (
    <IoIosCloseCircle className="closeIcon" style={commonStyle} />
  ) : (
    <IoCloseSharp className="closeIcon" style={commonStyle} />
  );
};

export default CloseToolRender;
