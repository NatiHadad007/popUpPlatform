import React, { useState, useEffect, useContext } from "react";
import { ToolContext } from "../context/ToolContext";
import { RiPictureInPictureExitLine } from "react-icons/ri";
import { FaRegClock } from "react-icons/fa";
import PopUpURLs from "./canvas-components/PopUpURLs";

const Triggers = () => {
  const {
    onExitToggle,
    activeTrigger,
    setActiveTrigger,
    popUpTimer,
    timerPop,
  } = useContext(ToolContext);

  const [popUpUrlPage, setPopUpUrlPage] = useState(<PopUpURLs />);

  const handleTriggerClick = (trigger) => {
    setActiveTrigger(trigger);
    onExitToggle(trigger);
  };

  const secondsUpdated = (e) => {
    const value = Math.max(1, Number(e.target.value));
    popUpTimer(value);
  };

  useEffect(() => {}, [activeTrigger, timerPop]);

  return (
    <div className="triggerContainer">
      <div className="triggerWrapper">
        <div className="settingsTtile">
          <h4>Triggers</h4>
        </div>
        <div className="Triggers">
          <p className="TriggersInfo">Select what will trigger your campaign</p>
          <div className="TriggersWrapper">
            <div className="triggerBox">
              <div
                className={`triggerIconWrapper${
                  activeTrigger === "exit" ? " active" : ""
                }`}
                onClick={() => handleTriggerClick("exit")}
                style={{
                  background: activeTrigger === "exit" ? "#6042cd" : "",
                  color: activeTrigger === "exit" ? "white" : "black",
                }}
              >
                <RiPictureInPictureExitLine className="triggerIcon" />
              </div>
              <div className="triggerText">
                <p>Show on exit</p>
              </div>
            </div>
            <div className="triggerBox">
              <div
                className={`triggerIconWrapper${
                  activeTrigger === "time" ? " active" : ""
                }`}
                onClick={() => handleTriggerClick("time")}
                style={{
                  background: activeTrigger === "time" ? "#6042cd" : "",
                  color: activeTrigger === "time" ? "white" : "black",
                }}
              >
                <FaRegClock className="triggerIcon" />
              </div>
              <div className="triggerText">
                <p>Time frame</p>
              </div>
            </div>
          </div>
          <div className="closeOption">
            <input type="checkbox" value="outside" />
            <label htmlFor="outSide">
              Close Popup on click outside the Popup
            </label>
          </div>
          {activeTrigger === "time" ? (
            <div className="timerWrapper">
              <div className="timerContainer">
                <p className="timerLine">Select when to open your PopUp</p>
                <div className="timerInput">
                  Open PopUp in{" "}
                  <input
                    onChange={secondsUpdated}
                    className="numberInput"
                    type="number"
                    min="1"
                    value={timerPop}
                  ></input>{" "}
                  second after page loads
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="triggerWrapper">
        <PopUpURLs />
      </div>
    </div>
  );
};

export default Triggers;
