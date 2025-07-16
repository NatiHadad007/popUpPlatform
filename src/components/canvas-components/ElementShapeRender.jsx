import React from "react";

const ElementShapeRender = ({ shape }) => {
  if (!shape) return null;

  const SVGtriangle = (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 200 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="inner-element"
      preserveAspectRatio="none"
      style={{
        width: "100%",
        height: "100%",
        opacity: shape.opacity || 1,
        overflow: "visible",
        borderRadius: 0,
      }}
    >
      <path
        d="M0 160H200L100 0L0 160Z"
        fill={shape.color || "#C4C4C4"}
        data-init-color={shape.color || "rgb(196, 196, 196)"}
      />
    </svg>
  );

  const commonStyle = {
    background: shape.type !== "triangle" ? shape.color : "none",
    borderRadius:
      shape.type === "circle"
        ? "50%"
        : shape.type === "squareBordered"
        ? "8px"
        : "0",
    opacity: shape.opacity || 1,
    zIndex: shape.ShapeLayer || 1,
    width: "100%",
    height: "100%",
  };

  return (
    <div className={`element ${shape.type}`} style={commonStyle}>
      {shape.type === "triangle" ? SVGtriangle : null}
    </div>
  );
};

export default ElementShapeRender;
