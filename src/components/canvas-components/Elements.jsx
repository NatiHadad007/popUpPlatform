import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import ShapesTool from "./ShapesTool";
import ElementsTemplate from "./ElementsTemplate";
import { GrFormPreviousLink } from "react-icons/gr";
import CloseTool from "./CloseTool";

const Elements = () => {
  const navigate = useNavigate();

  return (
    <div className="elementsWrapper">
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h4>Elements</h4>
              <ElementsTemplate navigate={navigate} />
            </div>
          }
        />
        <Route
          path="/shapes"
          element={
            <div>
              <GrFormPreviousLink
                className="goBackIcon"
                onClick={() => navigate("/")}
              />
              <ShapesTool />
            </div>
          }
        />
        <Route
          path="/closeIcons"
          element={
            <div>
              <GrFormPreviousLink
                className="goBackIcon"
                onClick={() => navigate("/")}
              />
              <CloseTool />
            </div>
          }
        />
      </Routes>
    </div>
  );
};

export default Elements;
