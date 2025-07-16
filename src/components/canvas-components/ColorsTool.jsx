import React, { useContext, useState, useEffect, useRef } from "react";
import ColorPicker from "react-pick-color";
import { ToolContext } from "../../context/ToolContext";

const ColorsTool = () => {
  const { shapeColorsFunc, selectedShape, positions } = useContext(ToolContext);
  const [color, setColor] = useState("#fff");
  const latestPositionRef = useRef(null); // ✅ here

  // Update the ref when selectedShape or positions change
  useEffect(() => {
    if (selectedShape?.id) {
      latestPositionRef.current = positions[selectedShape.id];
    }
  }, [positions, selectedShape]);

  const shapeColors = (newColor, opacity) => {
    if (selectedShape) {
      const currentPos = latestPositionRef.current; // ✅ always up-to-date
      shapeColorsFunc(selectedShape.id, newColor, opacity, currentPos);
    }
  };

  useEffect(() => {
    if (selectedShape?.color) {
      setColor(selectedShape.color);
    }
  }, [selectedShape]);

  return (
    <div className="ColorsTool">
      <h3>Colors Picker</h3>
      <ColorPicker
        color={color}
        onChange={(color) => {
          shapeColors(color.hex, color.rgb.a);
        }}
      />
    </div>
  );
};

export default ColorsTool;
