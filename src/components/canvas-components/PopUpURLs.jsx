import React, { useState, useEffect, useContext } from "react";
import { ToolContext } from "../../context/ToolContext";
import { MdOutlineAddCircle } from "react-icons/md";
import { FaCircleMinus } from "react-icons/fa6";

const PopUpURLs = () => {
  const { pagesFunction, elements, setElements, urlToSend, setUrlToSend } =
    useContext(ToolContext);

  const addInput = () => {
    const newInput = {
      id: Date.now(),
      value: "",
      checked: false,
    };
    setElements([...elements, newInput]);
  };

  const removeInput = (id) => {
    setElements(elements.filter((el) => el.id !== id));
  };

  const updateInputVal = (id, newValue) => {
    const updatedInput = elements.map((el) =>
      el.id === id ? { ...el, value: newValue } : el
    );

    const checkedInputsValues = updatedInput
      .filter((el) => el.checked)
      .map((el) => el.value);

    setElements(updatedInput);
    setUrlToSend(checkedInputsValues);
  };

  const sendUrl = (id, isChecked) => {
    const updatedElements = elements.map((el) =>
      el.id === id ? { ...el, checked: isChecked } : el
    );

    const checkedValues = updatedElements
      .filter((el) => el.checked)
      .map((el) => el.value);

    setElements(updatedElements);
    setUrlToSend(checkedValues);
  };

  useEffect(() => {
    pagesFunction(urlToSend);
  }, [urlToSend, elements]);

  return (
    <div className="PopUpURLsContainer">
      <div className="PopUpURLsWrapper">
        <div className="settingsTtile">
          <h4>Popup Pages</h4>
        </div>
        <div className="UrlsContainer">
          <p className="TriggersInfo">Show Popup on specific URLs</p>
          <div className="UrlsWrapper">
            <div className="AddUrl">
              <div className="AddButton" onClick={addInput}>
                Add <MdOutlineAddCircle style={{ color: "rgb(96, 66, 205)" }} />
              </div>
              <div className="inputsWrapper">
                {elements.map((inp) => (
                  <div key={inp.id} className="inputRow">
                    <input
                      className="pageUrl"
                      onChange={(e) => updateInputVal(inp.id, e.target.value)}
                      value={inp.value}
                    />
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={inp.checked}
                        onChange={(e) => sendUrl(inp.id, e.target.checked)}
                      />
                      <span
                        className={`switchSlider round${
                          inp.checked ? " checked" : ""
                        }`}
                      ></span>
                    </label>
                    <FaCircleMinus
                      style={{
                        color: "rgb(96, 66, 205)",
                        cursor: "pointer",
                      }}
                      onClick={() => removeInput(inp.id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUpURLs;
