import React from "react";
import EditorToolsBar from "./canvas-components/EditorToolsBar";
import EditorToolSettings from "./EditorToolSettings";
import ElementToolsBar from "./canvas-components/ElementToolsBar";
import { EditorToolsBarSetting } from "./canvas-components/EditorToolsBarSetting";
import CanvasSize from "./canvas-components/CanvasSize";
const MainCanvas = () => {
  return (
    <div className="main">
      <EditorToolsBar />
      <EditorToolSettings />
      <ElementToolsBar />
      <EditorToolsBarSetting />
      <CanvasSize />
    </div>
  );
};

export default MainCanvas;
