import React, { useContext, useState } from "react";
import ColorPicker from "react-pick-color";
import { ToolContext } from "../../context/ToolContext";

const ColorsTool = () => {
  const { shapeColorsFunc } = useContext(ToolContext);
  const [color] = useState("#fff");

  const shapeColors = (color) => {
    shapeColorsFunc(color);
  };
  return (
    <div className="ColorsTool">
      <h3>Colors Picker</h3>
      <ColorPicker color={color} onChange={(color) => shapeColors(color.hex)} />
    </div>
  );
};

export default ColorsTool;
