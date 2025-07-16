import React, { useEffect, useRef, useState, useContext } from "react";
import { ToolContext } from "../../context/ToolContext";
import { FaRegTrashAlt } from "react-icons/fa";
import { BsFillLayersFill } from "react-icons/bs";
import { IoTextSharp } from "react-icons/io5";

const ElementStickyBar = () => {
  const { shapeSelectedDelete, shapeSelectedLayer, selectedShape } =
    useContext(ToolContext);

  const trash = ({ shape }) => {
    shapeSelectedDelete();
  };

  const layer = () => {
    shapeSelectedLayer(selectedShape.id);
  };

  const text = () => {
    shapeSelectedLayer(selectedShape.id);
  };

  return (
    <div className="editorTools">
      <div className="shapeTools">
        <div className="Tool" onClick={trash}>
          <FaRegTrashAlt className="iconTool" />
        </div>
        <div className="Tool" onClick={layer}>
          <BsFillLayersFill className="iconTool" />
        </div>
        {selectedShape.elementType === "TextTool" ? (
          <div className="Tool" onClick={text}>
            <IoTextSharp className="iconTool" />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ElementStickyBar;
