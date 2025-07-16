import React from "react";

const ImageToolRender = ({ shape, shapePos }) => {
  if (!shape || shape.type !== "image") return null;
  return (
    <img
      className="imageShape"
      src={shape.elementType}
      alt="image shape"
      style={{
        width: shapePos.width,
        height: shapePos.height,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    />
  );
};

export default ImageToolRender;
