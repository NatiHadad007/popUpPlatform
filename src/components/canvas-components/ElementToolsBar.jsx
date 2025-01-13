import React, { useState, useContext, useEffect } from "react";
import { ToolContext } from "../../context/ToolContext";
import { FaRegTrashAlt } from "react-icons/fa";
import { RxCorners } from "react-icons/rx";
import { AiOutlineBgColors } from "react-icons/ai";
import CornersTool from "./CornersTool";

const ElementToolsBar = () => {
  const {
    shapeSelectedDelete,
    OpenElementToolsBarValue,
    toggleProfileBanner,
    ShapeSelectedType,
    cornerStates,
    selectedShape,
    setCornerStates,
    setTogglCornersSlider,
  } = useContext(ToolContext);

  const deleteShape = () => {
    shapeSelectedDelete();
  };

  const activeCornersSlider = (tool) => {
    setTogglCornersSlider(tool);
  };

  const openFillBar = (tool) => {
    toggleProfileBanner(tool);
  };

  const tools = [
    {
      id: "elements",
      icon: <FaRegTrashAlt className="editorIcon" />,
      label: "Trash",
      onClick: deleteShape,
    },
    ...(ShapeSelectedType
      ? []
      : [
          {
            id: "colorFill",
            icon: <AiOutlineBgColors className="editorIcon" />,
            label: "colorFill",
            onClick: () => openFillBar("colorFill"),
          },
        ]),
    {
      id: "Corners",
      icon: <RxCorners className="editorIcon" />,
      label: "Corners",
      onClick: activeCornersSlider,
    },
  ];

  // console.log(selectedShape);

  useEffect(() => {
    if (!cornerStates || !OpenElementToolsBarValue) {
      setCornerStates(null);
    }
  }, [cornerStates, OpenElementToolsBarValue]);

  return (
    <div
      className={`editorToolBar elementToolBar${
        selectedShape && Object.keys(selectedShape).length > 0 ? " slider" : ""
      }`}
    >
      <div className="editorWrapperIcons">
        {tools.map((tool) => (
          <div key={tool.id} className="editorTool" onClick={tool.onClick}>
            <div className="editIcon">{tool.icon}</div>
            <div className="tooltip">
              <span className="tooltiptext">{tool.label}</span>
            </div>
          </div>
        ))}
        {cornerStates && OpenElementToolsBarValue && <CornersTool />}
      </div>
    </div>
  );
};

export default ElementToolsBar;
