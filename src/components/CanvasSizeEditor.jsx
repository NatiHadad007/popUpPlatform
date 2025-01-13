import React, { useEffect, useRef, useState } from "react";
import { ToolContext } from "../context/ToolContext";
import { useContext } from "react";
import ElementStickyBar from "./canvas-components/ElementStickyBar";

const CanvasSizeEditor = () => {
  const { WidthPx, HeightPx, shapes, shapeSelected, selectedShape } =
    useContext(ToolContext);
  const deviceRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [currentShape, setCurrentShape] = useState(null);
  const [currentShapePos, setcurrentShapePos] = useState(null);
  const [ShapeSize, setShapeSize] = useState(70);
  const [elementEditor, SetElementEditor] = useState(false);

  const shapeClick = (shape) => {
    shapeSelected(shape);
    SetElementEditor(true);
  };

  const onMouseDown = (e, shape) => {
    if (e.target.closest(".editorTools")) {
      return;
    }
    e.stopPropagation();
    shapeSelected(shape);
    setDragging(true);
    SetElementEditor(false);
    setCurrentShape(e.target);
    // Calculate the center of the shape
    const rect = e.target.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const xStartPoint =
      e.clientX - window.innerWidth + window.innerWidth / 2 + 60 * 2 + 42;
    setcurrentShapePos(xStartPoint);
    const startX = e.clientX;
    setOffset({ x: startX, initialWidth: rect.width });
    // Set offset to center the shape under the mouse
    setOffset({
      x: centerX,
      y: centerY,
    });
  };

  const onMouseMove = (e) => {
    if (!dragging || !currentShape) return;

    // Calculate new position with the offset to center the shape
    const x =
      e.clientX - window.innerWidth + window.innerWidth / 2 + 60 * 2 + 42;
    const y =
      e.clientY - window.innerHeight + window.innerHeight / 2 + 70 * 2 + 35;

    const deltaX = x; // Difference in mouse movement
    const newWidth = deltaX; // Ensure minimum width
    const middleX = window.innerWidth / 2; // Midpoint of the screen width

    // Update the position of the shape
    let shapeDrag = currentShape.closest(".shape");
    if (shapeDrag) {
      shapeDrag.style.left = `${x}px`;
      shapeDrag.style.top = `${y}px`;
    }

    // Check mouse position relative to the middle X
    if (currentShape.className.includes("middle-left")) {
      if (e.clientX < middleX) {
        console.log(e.clientX, middleX);
        setShapeSize(newWidth);
      }
    }
  };

  const onMouseUp = () => {
    SetElementEditor(true);
    setDragging(false);
    setCurrentShape(null);
    setOffset({ x: 0, initialWidth: 0 });
  };

  const handleOutsideClick = (e) => {
    if (deviceRef.current && !deviceRef.current.contains(e.target)) {
      shapeSelected(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [dragging, offset, currentShape, selectedShape, elementEditor, ShapeSize]);

  return (
    <div id="device-con">
      <div
        id="device"
        style={{ width: `${WidthPx}px`, height: `${HeightPx}px` }}
      >
        {shapes.map((shape, index) => (
          <div
            key={index}
            className="shape"
            ref={deviceRef}
            onClick={(e) => shapeClick(shape)}
            onMouseDown={(e) => onMouseDown(e, shape)}
            style={{
              width: ShapeSize,
              border:
                selectedShape === shape && !dragging ? "1px dashed black" : "",
            }}
          >
            {selectedShape === shape && !dragging && (
              <>
                <div className="handle top-left" style={{ display: "block" }} />
                <div
                  className="handle middle-left"
                  style={{ display: "block" }}
                />
                <div
                  className="handle top-right"
                  style={{ display: "block" }}
                />
                <div
                  className="handle bottom-left"
                  style={{ display: "block" }}
                />
                <div
                  className="handle bottom-right"
                  style={{ display: "block" }}
                />
                <div
                  className="handle middle-right"
                  style={{ display: "block" }}
                />
                {elementEditor ? <ElementStickyBar /> : ""}
              </>
            )}
            <div
              className={`element ${shape.type}`}
              style={{ width: ShapeSize }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CanvasSizeEditor;
