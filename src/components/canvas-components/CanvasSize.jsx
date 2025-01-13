import React, { useContext, useEffect, useState } from "react";
import { ToolContext } from "../../context/ToolContext";
import { RxWidth } from "react-icons/rx";
import { MdHeight } from "react-icons/md";

const CanvasSize = () => {
  const { WidthPx, HeightPx } = useContext(ToolContext);

  const [popWidth, setPopWidth] = useState(WidthPx);
  const [popHeight, setPopHeight] = useState(HeightPx);
  const { contextSizes } = useContext(ToolContext);

  useEffect(() => {}, [popWidth, popHeight]);

  const setWidthSize = (e, w) => {
    setPopWidth(e);
    contextSizes(e, "w");
  };

  const setHeightSize = (e) => {
    setPopHeight(e);
    contextSizes(e, "h");
  };

  return (
    <div className="CanvasSizeContainer">
      <div className="CanvasSizeWrapper">
        <div className="pageSize">
          {popWidth} x {popHeight}
        </div>
        <div className="widthAnHeight">
          <label htmlFor="W">
            <RxWidth />
            <input
              className="popWidth"
              type="number"
              value={popWidth}
              onChange={(e) => setWidthSize(e.target.value)}
            />
          </label>
          <label htmlFor="W">
            <MdHeight />
            <input
              className="popHeight"
              type="number"
              value={popHeight}
              onChange={(e) => setHeightSize(e.target.value)}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default CanvasSize;
