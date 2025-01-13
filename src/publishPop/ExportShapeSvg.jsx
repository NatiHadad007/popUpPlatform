import React, { useEffect, useContext, useRef } from "react";
import { ToolContext } from "../context/ToolContext";

const ExportShapeSvg = ({ onExportComplete }) => {
  const { WidthPx, HeightPx, ShapePosLeft, ShapePosTop } =
    useContext(ToolContext);
  const hasExported = useRef(false);

  useEffect(() => {
    if (hasExported.current) return;
    hasExported.current = true;

    const objects = canvas.getObjects();
    const originalSizes = [];

    objects.forEach((obj) => {
      originalSizes.push({
        obj,
      });
    });

    let svg = canvas.toSVG({
      width: WidthPx,
      height: HeightPx,
    });

    // if (svg.includes("x=")) {
    //   console.log(svgs);
    // }

    console.log(ShapePosLeft, ShapePosTop);

    // Inject x and y attributes into the SVG
    (svg = svg
      .replace(/viewBox="[^"]*"/, "") // Remove viewBox
      .replace(/<g transform="[^"]*">/g, "") // Remove <g transform>
      .replace(/transform="matrix\([^"]*\)"/g, "")).replace(
      /<rect([^>]+)x="([^"]+)" y="([^"]+)"/g,
      ` x="${ShapePosLeft}" y="${ShapePosTop}"`
    );

    originalSizes.forEach(({ obj }) => {
      obj.setCoords();
    });

    const svgBlob = new Blob([svg], { type: "image/svg+xml" });
    let parser = new DOMParser();
    let svgDoc = parser.parseFromString(svg, "image/svg+xml");
    let rect = svgDoc.querySelector("rect");
    if (rect) {
      rect.setAttribute("x", ShapePosTop);
      rect.setAttribute("y", ShapePosLeft);
      console.log(svgDoc);
    }
    const svgUrl = URL.createObjectURL(svgBlob);
    const downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = "exported_canvas.svg";
    // downloadLink.click();

    if (onExportComplete) {
      console.log(svg);
      onExportComplete();
    }
  }, [WidthPx, HeightPx, ShapePosLeft, ShapePosTop, onExportComplete]);

  return null;
};

export default ExportShapeSvg;
