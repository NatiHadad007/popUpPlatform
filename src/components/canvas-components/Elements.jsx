import React, { useState } from "react";
import ShapesTool from "./ShapesTool";
import ElementsTemplate from "./ElementsTemplate";
import { GrFormPreviousLink } from "react-icons/gr";
import CloseTool from "./CloseTool";
import TextTool from "../TextTool";
import ButtonsTool from "./ButtonsTool";

const Elements = () => {
  const [activeTool, setActiveTool] = useState("template");
  const goBack = () => setActiveTool("template");

  return (
    <div className="elementsWrapper">
      {activeTool === "template" && (
        <div>
          <h4>Elements</h4>
          <ElementsTemplate setActiveTool={setActiveTool} />
        </div>
      )}

      {activeTool === "shapes" && (
        <div>
          <GrFormPreviousLink className="goBackIcon" onClick={goBack} />
          <ShapesTool />
        </div>
      )}

      {activeTool === "closeIcons" && (
        <div>
          <GrFormPreviousLink className="goBackIcon" onClick={goBack} />
          <CloseTool />
        </div>
      )}
      {activeTool === "text" && (
        <div>
          <GrFormPreviousLink className="goBackIcon" onClick={goBack} />
          <TextTool />
        </div>
      )}
      {activeTool === "Buttons" && (
        <div>
          <GrFormPreviousLink className="goBackIcon" onClick={goBack} />
          <ButtonsTool />
        </div>
      )}
    </div>
  );
};

export default Elements;
