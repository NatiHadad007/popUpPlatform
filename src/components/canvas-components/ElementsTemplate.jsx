import React, { useContext } from "react";
import { FaShapes } from "react-icons/fa6";
import { VscTextSize } from "react-icons/vsc";
import { BsMenuButtonWideFill } from "react-icons/bs";
import { IoIosCloseCircle } from "react-icons/io";
import { ToolContext } from "../../context/ToolContext";

const ElementsTemplate = ({ navigate }) => {
  const { addShape } = useContext(ToolContext);
  const addShapeClick = (e, shape) => {
    addShape(shape);
  };

  return (
    <div className="elementsContainer">
      <div className="elementBlock" onClick={() => navigate("/shapes")}>
        <FaShapes className="elementicon" />
        <p className="elementText">Shapes</p>
      </div>
      <div className="elementBlock" onClick={(e) => addShapeClick(e, "text")}>
        <VscTextSize className="elementicon" />
        <p className="elementText">Text</p>
      </div>
      <div
        className="elementBlock"
        onClick={() => alert("Buttons tool coming soon!")}
      >
        <BsMenuButtonWideFill className="elementicon" />
        <p className="elementText">Buttons</p>
      </div>
      <div className="elementBlock" onClick={() => navigate("/closeIcons")}>
        <IoIosCloseCircle className="elementicon" />
        <p className="elementText">Close Symbols</p>
      </div>
    </div>
  );
};

export default ElementsTemplate;
