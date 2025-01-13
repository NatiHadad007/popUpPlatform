import React, { useContext, useState } from "react";
import { ToolContext } from "../../context/ToolContext";
import ColorsTool from "./ColorsTool";

export const EditorToolsBarSetting = () => {
  const { toolStates, OpenElementToolsBarValue } = useContext(ToolContext);

  return (
    <div
      className={`editorToolBarSlider elementSetting${
        OpenElementToolsBarValue ? " sliderElementSettings" : ""
      }`}
      style={{
        display: toolStates === "colorFill" ? "flex" : "none",
      }}
    >
      <ColorsTool />
    </div>
  );
};
