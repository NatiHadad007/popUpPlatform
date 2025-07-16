import React, { useContext, useState } from "react";
import { ToolContext } from "../../context/ToolContext";
import ColorsTool from "./ColorsTool";

export const EditorToolsBarSetting = () => {
  const { toolStates, selectedShape } = useContext(ToolContext);
  return (
    <div
      className="editorToolBarSlider elementSetting"
      style={{
        right: toolStates === "colorFill" && selectedShape ? "75px" : "-370px",
      }}
    >
      <ColorsTool />
    </div>
  );
};
