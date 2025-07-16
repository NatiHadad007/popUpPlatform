import React, { createContext, useRef, useState, useEffect } from "react";
import saveOrUpdateShape from "../components/SaveOrUpdateShape";
export const ToolContext = createContext();

export const ToolProvider = ({ children }) => {
  const [toolStates, setToolStates] = useState(null); // Initialize as an object
  const [cornerStates, setCornerStates] = useState(null);
  const [shapes, setShapes] = useState([]);
  const [images, setImages] = useState();
  const [selectedShape, setSelectedShape] = useState([]);
  const [ShapesToDelete, setShapesToDelete] = useState([]);
  const [deletedShapes, setDeletedShapes] = useState([]);
  const [ShapeColor, setShapeColor] = useState("#555");
  const [ShapeOpacity, setShapeOpacity] = useState(1);
  const [ShapeLayer, setShapeLayer] = useState(1);
  const [WidthPx, setWidthPx] = useState(400);
  const [positions, setPositions] = useState({});
  const [popupTrigger, setPopupTrigger] = useState("exit");
  const [activeTrigger, setActiveTrigger] = useState("exit");
  const [timerPop, setTimerPop] = useState(5);
  const [HeightPx, setHeightPx] = useState(400);
  const [cornerPx, setCornerPx] = useState(20);
  const deviceRef = useRef(null);
  const [elements, setElements] = useState([]);
  const [urlToSend, setUrlToSend] = useState([]);
  const [popupURLsArr, setPopupURLsArr] = useState([]);
  const [deviceHTML, setDeviceHTML] = useState(() => {
    return localStorage.getItem("deviceHTML") || "";
  });
  const [OpenElementToolsBarValue, setOpenElementToolsBarValue] = useState();

  const toggleProfileBanner = (tool) => {
    setToolStates((prev) => (prev === tool ? null : tool));
  };

  const pagesFunction = (page) => {
    setPopupURLsArr(page);
  };

  const updateDeviceHTML = (html) => {
    if (html) {
      localStorage.setItem("deviceHTML", html);
      setDeviceHTML(html);
    }
    return null;
  };

  const popUpTimer = (timer) => {
    console.log(timer);
    setTimerPop(timer);
  };

  const setTogglCornersSlider = (tool) => {
    setCornerStates((prev) => (prev === tool ? null : tool));
  };

  const shapeColorsFunc = (shapeId, color, opacity, position) => {
    setShapeColor(color);
    setShapeOpacity(opacity);

    setShapes((prevShapes) => {
      const updatedShapes = prevShapes.map((shape) =>
        shape.id === shapeId ? { ...shape, color, opacity } : shape
      );

      const updatedShape = updatedShapes.find((shape) => shape.id === shapeId);
      if (updatedShape) {
        saveOrUpdateShape(shapeId, {
          ...updatedShape,
          position,
        });
      }

      return updatedShapes;
    });

    setSelectedShape((prev) =>
      prev?.id === shapeId ? { ...prev, color, opacity } : prev
    );
  };

  const addShape = (shapeType, types, imgsrc) => {
    const newShape = {
      id: Date.now(), // Unique ID
      type: shapeType,
      elementType: types,
      color: ShapeColor,
      ...(imgsrc && { img: imgsrc }), // Add img only if imgsrc is truthy
    };
    setShapes((prev) => [...prev, newShape]);
  };

  const shapeSelected = (shape) => {
    setSelectedShape(shape);
  };

  const onExitToggle = (type) => {
    setPopupTrigger(type);
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
    const updatedShapes = shapes.filter(
      (shape) => shape.id !== selectedShape.id
    );
    setShapes(updatedShapes);
    setSelectedShape(null);
  };

  const shapeSelectedLayer = (shapeId) => {
    setShapeLayer(ShapeLayer + 1);
    setShapes((prevShapes) =>
      prevShapes.map((shape) =>
        shape.id === shapeId ? { ...shape, ShapeLayer } : shape
      )
    );
  };

  useEffect(() => {
    const handleKeyDown = ({ key }) => {
      if (
        (key === "Backspace" || key === "Delete") &&
        selectedShape &&
        selectedShape.elementType !== "TextTool"
      ) {
        shapeSelectedDelete();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedShape, shapes, toolStates, ShapeColor, timerPop, popupURLsArr]);

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
        ShapeOpacity,
        images,
        WidthPx,
        HeightPx,
        cornerStates,
        popupTrigger,
        cornerPx,
        deviceRef,
        ShapeLayer,
        deviceHTML,
        positions,
        activeTrigger,
        timerPop,
        popupURLsArr,
        elements,
        urlToSend,
        setUrlToSend,
        setElements,
        pagesFunction,
        updateDeviceHTML,
        setActiveTrigger,
        setPositions,
        toggleProfileBanner,
        setTogglCornersSlider,
        setDeletedShapes,
        onExitToggle,
        setToolStates,
        setCornerStates,
        setOpenElementToolsBar,
        shapeColorsFunc,
        shapeSelected,
        contextSizes,
        contextBorder,
        setShapes,
        addShape,
        popUpTimer,
        setShapesToDelete,
        setSelectedShape,
        shapeSelectedDelete,
        shapeSelectedLayer,
      }}
    >
      {children}
    </ToolContext.Provider>
  );
};

export default ToolProvider;
