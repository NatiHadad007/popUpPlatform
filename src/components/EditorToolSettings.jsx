import React, { useContext } from "react";
import { ToolContext } from "../context/ToolContext";
import Elements from "./canvas-components/Elements";
import Uploads from "./canvas-components/Uploads";
const EditorToolSettings = () => {
  const { toolStates } = useContext(ToolContext);

  const renderComponent = () => {
    switch (toolStates) {
      case "Elements":
        return <Elements />;
      case "Uploads":
        return <Uploads />;
      case "colorFill":
        return false;
      default:
        return null;
    }
  };

  return (
    toolStates &&
    toolStates !== "colorFill" && (
      <div className="editorToolBarContainer">{renderComponent()}</div>
    )
  );
};

export default EditorToolSettings;
