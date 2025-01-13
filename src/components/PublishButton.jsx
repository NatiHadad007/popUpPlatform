import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FaRegPauseCircle } from "react-icons/fa";
import { IoTime } from "react-icons/io5";
import ExportShapeSvg from "../publishPop/exportShapeSvg";

const PublishButton = () => {
  const [exportTriggered, setExportTriggered] = useState(false);

  const handlePublishClick = () => {
    setExportTriggered(true);
  };

  return (
    <div className="publishContainer">
      <div className="dropdown">
        <button
          className="publishButton"
          type="button"
          data-bs-toggle="dropdown"
          data-test-id="editorDropDown"
          aria-expanded="false"
          onClick={handlePublishClick}
        >
          Publish
        </button>
        <button className="dropdownBtn" type="button">
          <IoIosArrowDown />
        </button>
        <ul className="submenu">
          <li className="popStatus">
            <FaRegPauseCircle /> Paused
          </li>
          <li className="popStatus">
            <IoTime /> Schedule
          </li>
        </ul>
      </div>

      {exportTriggered && (
        <ExportShapeSvg onExportComplete={() => setExportTriggered(false)} />
      )}
    </div>
  );
};

export default PublishButton;
