import React, { useEffect, useState, useContext, useRef } from "react";
import { ToolContext } from "../context/ToolContext";
import ElementStickyBar from "./canvas-components/ElementStickyBar";
import ElementShapeRender from "./canvas-components/ElementShapeRender";
import CloseToolRender from "./canvas-components/CloseToolRender";
import TextToolRender from "./canvas-components/TextToolRender";
import ImageToolRender from "./canvas-components/ImageToolRender";
import ButtonsToolRender from "./canvas-components/ButtonsToolRender";
import saveOrUpdateShape from "./SaveOrUpdateShape";
import PullShapeData from "./PullShapeData";

const ShapesHandler = () => {
  const {
    WidthPx,
    HeightPx,
    shapes,
    shapeSelected,
    selectedShape,
    deviceRef,
    positions,
    updateDeviceHTML,
    setPositions,
    setShapes,
  } = useContext(ToolContext);

  const prevShapesRef = useRef([]);
  const positionsRef = useRef({});
  const [dragging, setDragging] = useState(false);
  const [elementEditor, SetElementEditor] = useState(false);

  const persistShape = (shapeId, overrides = {}) => {
    const shapeToUpdate = shapes.find((s) => s.id === shapeId);
    if (!shapeToUpdate) return;

    const updatedPos = positionsRef.current[shapeId];
    saveOrUpdateShape(shapeId, {
      ...shapeToUpdate,
      ...overrides,
      position: updatedPos,
    });
  };

  const onMouseDown = (e, shape) => {
    if (e.target.closest(".editorTools")) return;

    e.preventDefault();
    shapeSelected(shape);
    SetElementEditor(true);

    const shapePos = positions[shape.id] || {
      x: 0,
      y: 0,
      width: 70,
      height: 70,
    };

    const startX = e.clientX - shapePos.x;
    const startY = e.clientY - shapePos.y;

    setDragging(true);

    const mousemove = (e) => {
      const newX = e.clientX - startX;
      const newY = e.clientY - startY;

      setPositions((prev) => {
        const updated = {
          ...prev,
          [shape.id]: {
            ...prev[shape.id],
            x: newX,
            y: newY,
            width: prev[shape.id]?.width || 70,
            height: prev[shape.id]?.height || 70,
          },
        };
        return updated;
      });
    };

    const mouseup = () => {
      persistShape(shape.id);
      setDragging(false);
      SetElementEditor(false);
      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("mouseup", mouseup);
    };

    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseup", mouseup);
  };

  const handleResizeMouseDown = (e, shapeId, direction) => {
    e.preventDefault();
    e.stopPropagation();

    const startX = e.clientX;
    const startY = e.clientY;
    const shape = positions[shapeId] || {
      x: 0,
      y: 0,
      width: 70,
      height: 70,
    };

    const mousemove = (e) => {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      setPositions((prev) => {
        const updated = { ...(prev[shapeId] || shape) };

        if (direction.includes("right"))
          updated.width = Math.max(20, shape.width + dx);
        if (direction.includes("bottom"))
          updated.height = Math.max(20, shape.height + dy);
        if (direction.includes("left")) {
          const newWidth = Math.max(20, shape.width - dx);
          updated.x = shape.x + dx;
          updated.width = newWidth;
        }
        if (direction.includes("top")) {
          const newHeight = Math.max(20, shape.height - dy);
          updated.y = shape.y + dy;
          updated.height = newHeight;
        }

        return { ...prev, [shapeId]: updated };
      });
    };

    const mouseup = () => {
      persistShape(shapeId);
      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("mouseup", mouseup);
    };

    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseup", mouseup);
  };

  const handleOutsideClick = (e) => {
    if (
      !e.target.closest(".shape") &&
      !e.target.closest(".editorToolBar") &&
      !e.target.closest(".editorToolBarSlider")
    ) {
      shapeSelected(null);
    }
  };

  useEffect(() => {
    positionsRef.current = positions;
    const prevShapes = prevShapesRef.current;
    const newShapes = shapes.filter(
      (shape) => !prevShapes.some((prev) => prev.id === shape.id)
    );
    newShapes.forEach((shape) => {
      const shapePos = positions[shape.id] || {
        x: 0,
        y: 0,
        width: 70,
        height: 70,
      };

      saveOrUpdateShape(shape.id, {
        ...shape,
        position: shapePos,
        color: shape.color,
        opacity: shape.opacity,
        ShapeLayer: shape.ShapeLayer,
        type: shape.type,
      });
    });

    if (deviceRef.current) {
      const html = deviceRef.current.closest(".popupCanvas")?.outerHTML;
      if (html) {
        updateDeviceHTML(html);
      }
    }

    prevShapesRef.current = shapes;
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [shapes, dragging, selectedShape, elementEditor, positions]);

  useEffect(() => {
    PullShapeData((serverShapes) => {
      if (serverShapes && Array.isArray(serverShapes[0])) {
        const flat = serverShapes[0];
        const firstShapes = flat.map((item) => item.shapes[0]);
        setShapes(firstShapes);

        const initialPositions = {};
        firstShapes.forEach((shape) => {
          if (shape.position) {
            initialPositions[shape.id] = shape.position;
          }
        });
        setPositions((prev) => ({ ...initialPositions, ...prev }));
      }
    });
  }, []);

  return (
    <div
      id="device-con"
      ref={deviceRef}
      className="popupCanvas"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <div
        id="device"
        style={{
          width: `${WidthPx}px`,
          height: `${HeightPx}px`,
          position: "relative",
        }}
      >
        {shapes.map((shape) => {
          const shapePos = positions[shape.id] || {
            x: 0,
            y: 0,
            width: 70,
            height: 70,
          };
          return (
            <div
              key={shape.id}
              className="shape"
              onMouseDown={(e) => onMouseDown(e, shape)}
              style={{
                position: "absolute",
                left: `${shapePos.x}px`,
                top: `${shapePos.y}px`,
                width: `${shapePos.width}px`,
                height: `${shapePos.height}px`,
                border: selectedShape === shape ? "1px dashed black" : "",
              }}
            >
              {selectedShape === shape && !dragging && (
                <>
                  <div
                    className="handle top-left"
                    style={{ zIndex: shape.ShapeLayer }}
                    onMouseDown={(e) =>
                      handleResizeMouseDown(e, shape.id, "top-left")
                    }
                  />
                  <div
                    className="handle top-right"
                    style={{ zIndex: shape.ShapeLayer }}
                    onMouseDown={(e) =>
                      handleResizeMouseDown(e, shape.id, "top-right")
                    }
                  />
                  <div
                    className="handle bottom-left"
                    style={{ zIndex: shape.ShapeLayer }}
                    onMouseDown={(e) =>
                      handleResizeMouseDown(e, shape.id, "bottom-left")
                    }
                  />
                  <div
                    className="handle bottom-right"
                    style={{ zIndex: shape.ShapeLayer }}
                    onMouseDown={(e) =>
                      handleResizeMouseDown(e, shape.id, "bottom-right")
                    }
                  />
                  <div
                    className="handle middle-left"
                    style={{ zIndex: shape.ShapeLayer }}
                    onMouseDown={(e) =>
                      handleResizeMouseDown(e, shape.id, "left")
                    }
                  />
                  <div
                    className="handle middle-right"
                    style={{ zIndex: shape.ShapeLayer }}
                    onMouseDown={(e) =>
                      handleResizeMouseDown(e, shape.id, "right")
                    }
                  />
                  <ElementStickyBar />
                </>
              )}

              {shape.elementType === "shape" ? (
                <ElementShapeRender shape={shape} />
              ) : shape.elementType === "closeTool" ? (
                <CloseToolRender shape={shape} shapePos={shapePos} />
              ) : shape.elementType === "TextTool" ? (
                <TextToolRender shape={shape} shapePos={shapePos} />
              ) : shape.elementType === "ButtonTool" ? (
                <ButtonsToolRender shape={shape} shapePos={shapePos} />
              ) : (
                <ImageToolRender shape={shape} shapePos={shapePos} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShapesHandler;
