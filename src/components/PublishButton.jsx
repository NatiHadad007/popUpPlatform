import React, { useState, useContext } from "react";
import { ToolContext } from "../context/ToolContext";
import { IoIosArrowDown } from "react-icons/io";
import { FaRegPauseCircle } from "react-icons/fa";
import { IoTime } from "react-icons/io5";

const PublishButton = () => {
  const { deviceHTML, popupTrigger, timerPop, popupURLsArr } =
    useContext(ToolContext);
  const handlePublishClick = async () => {
    const html = deviceHTML;
    const allowedPages = popupURLsArr;
    const serverUrl = "https://popupserverside.onrender.com";
    const showOnExit = popupTrigger; // 'exit' or 'time'
    const showOnTimer = popupTrigger === "time" ? timerPop : null;
    console.log({ html, showOnExit, showOnTimer, allowedPages }); // ✅ Add this for debug
    if (html) {
      try {
        // "https://popupserverside.onrender.com/device-html",
        const res = await fetch(`${serverUrl}/device-html`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            html,
            showOnExit,
            showOnTimer,
            allowedPages,
          }),
        });
        console.log("HTML sent to server");
      } catch (err) {
        console.error("Failed to send HTML:", err);
      }
    }
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
    </div>
  );
};

export default PublishButton;
