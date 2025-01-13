import React, { useEffect, useRef, useState, useContext } from "react";
import { ToolContext } from "../../context/ToolContext";
import { FaRegTrashAlt } from "react-icons/fa";
const ElementStickyBar = () => {
  const { shapeSelectedDelete } = useContext(ToolContext);

  const trash = () => {
    shapeSelectedDelete();
  };

  return (
    <div className="editorTools">
      <div className="shapeTools">
        <div className="Tool" onClick={trash}>
          <FaRegTrashAlt className="trashTool" />
        </div>
      </div>
    </div>
  );
};

export default ElementStickyBar;
