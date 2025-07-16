import React, { useContext } from "react";
import { FaShapes } from "react-icons/fa6";
import { VscTextSize } from "react-icons/vsc";
import { BsMenuButtonWideFill } from "react-icons/bs";
import { IoIosCloseCircle } from "react-icons/io";

const ElementsTemplate = ({ setActiveTool }) => {
  return (
    <div className="elementsContainer">
      <div className="elementBlock" onClick={() => setActiveTool("shapes")}>
        <FaShapes className="elementicon" />
        <p className="elementText">Shapes</p>
      </div>
      <div className="elementBlock" onClick={(e) => setActiveTool("text")}>
        <VscTextSize className="elementicon" />
        <p className="elementText">Text</p>
      </div>
      <div className="elementBlock" onClick={() => setActiveTool("Buttons")}>
        <BsMenuButtonWideFill className="elementicon" />
        <p className="elementText">Buttons</p>
      </div>
      <div className="elementBlock" onClick={() => setActiveTool("closeIcons")}>
        <IoIosCloseCircle className="elementicon" />
        <p className="elementText">Close Symbols</p>
      </div>
    </div>
  );
};

export default ElementsTemplate;
