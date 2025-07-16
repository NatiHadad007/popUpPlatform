import React from "react";
import { TbBackground } from "react-icons/tb";

const ButtonsToolRender = ({ shape, shapePos }) => {
  if (!shape || shape.elementType !== "ButtonTool") return null;
  const commonStyle = {
    backgroundColor: shape.type !== "BlankBG" ? "#006ce7" : "#fff",
    zIndex: shape.ShapeLayer,
    opacity: shape.opacity || "",
    border: "0 solid #000",
    position: "absolute",
    borderRadius: shape.type !== "pointy" ? "25px" : "5px",
    width: `${shapePos.width}px`,
    height: `${shapePos.height}px`,
  };

  return (
    <button className={`element ${shape.type}`} style={commonStyle}>
      Button
    </button>
  );
};

export default ButtonsToolRender;
