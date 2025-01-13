import React, { useContext, useState } from "react";
import { ToolContext } from "../../context/ToolContext";

const CornersTool = () => {
  const { contextBorder, cornerPx } = useContext(ToolContext);
  const [corner, setcorner] = useState(cornerPx);

  const setSlider = (e) => {
    setcorner(e);
    contextBorder(e);
  };
  return (
    <div className="slidecontainer">
      {corner}%
      <input
        type="range"
        min="1"
        max="100"
        onChange={(e) => setSlider(e.target.value)}
      />
    </div>
  );
};

export default CornersTool;
