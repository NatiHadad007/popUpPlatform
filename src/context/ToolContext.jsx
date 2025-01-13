import React, { createContext, useState, useEffect } from "react";

export const ToolContext = createContext();

export const ToolProvider = ({ children }) => {
  const [toolStates, setToolStates] = useState(null); // Initialize as an object
  const [cornerStates, setCornerStates] = useState(null);
  const [shapes, setShapes] = useState([]);
  const [images, setImages] = useState();
  const [selectedShape, setSelectedShape] = useState([]);
  const [ShapesToDelete, setShapesToDelete] = useState([]);
  const [deletedShapes, setDeletedShapes] = useState([]);
  const [ShapeColor, setShapeColor] = useState(null);
  const [WidthPx, setWidthPx] = useState(400);
  const [HeightPx, setHeightPx] = useState(400);
  const [cornerPx, setCornerPx] = useState(20);
  const [OpenElementToolsBarValue, setOpenElementToolsBarValue] = useState();

  const toggleProfileBanner = (tool) => {
    setToolStates((prev) => (prev === tool ? null : tool));
  };

  const setTogglCornersSlider = (tool) => {
    setCornerStates((prev) => (prev === tool ? null : tool));
  };

  const shapeColorsFunc = (color) => {
    setShapeColor(color);
  };

  const addShape = (shapeType) => {
    const newShape = {
      id: Date.now(), // Unique ID
      type: shapeType,
    };
    setShapes((prev) => [...prev, newShape]);
  };

  const shapeSelected = (shape) => {
    setSelectedShape(shape);
  };

  const contextSizes = (size, pos) => {
    pos === "w" ? setWidthPx(size) : setHeightPx(size);
  };

  const contextBorder = (borderRadious) => {
    setCornerPx(borderRadious);
  };

  const setOpenElementToolsBar = (clicked) => {
    setOpenElementToolsBarValue(clicked);
  };

  const shapeSelectedDelete = () => {
    console.log("clicked on trash");
    const updatedShapes = shapes.filter(
      (shape) => shape.id !== selectedShape.id
    );
    setShapes(updatedShapes);
    setSelectedShape(null);
  };

  useEffect(() => {}, [toolStates]);

  return (
    <ToolContext.Provider
      value={{
        toolStates,
        selectedShape,
        ShapesToDelete,
        shapes,
        deletedShapes,
        OpenElementToolsBarValue,
        ShapeColor,
        images,
        WidthPx,
        HeightPx,
        cornerStates,
        cornerPx,
        toggleProfileBanner,
        setTogglCornersSlider,
        setDeletedShapes,
        setToolStates,
        setCornerStates,
        setOpenElementToolsBar,
        shapeColorsFunc,
        shapeSelected,
        contextSizes,
        contextBorder,
        addShape,
        setShapesToDelete,
        setSelectedShape,
        shapeSelectedDelete,
      }}
    >
      {children}
    </ToolContext.Provider>
  );
};

export default ToolProvider;
