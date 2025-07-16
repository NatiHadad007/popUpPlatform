import React, { useState, useContext } from "react";
import { IoShapesOutline } from "react-icons/io5";
import { TbBackground } from "react-icons/tb";
import { TbScanPosition } from "react-icons/tb";
import { FiUpload } from "react-icons/fi";
import { ToolContext } from "../../context/ToolContext";

const EditorToolsBar = () => {
  const { toggleProfileBanner } = useContext(ToolContext);

  const onToggle = (tool) => {
    toggleProfileBanner(tool);
  };

  const tools = [
    {
      id: "elements",
      icon: <IoShapesOutline className="editorIcon" />,
      label: "Elements",
    },
    {
      id: "background",
      icon: <TbBackground className="editorIcon" />,
      label: "BG",
    },
    {
      id: "position",
      icon: <TbScanPosition className="editorIcon" />,
      label: "Position",
    },
    {
      id: "uploads",
      icon: <FiUpload className="editorIcon" />,
      label: "Uploads",
    },
  ];

  return (
    <div className="editorToolBar">
      <div className="editorWrapperIcons">
        {tools.map((tool) => (
          <div
            key={tool.id}
            className="editorTool"
            onClick={(e) => onToggle(tool.label)}
          >
            {tool.icon}
            <p className="toolBarText">{tool.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditorToolsBar;
