function getCanvasContentBoundingBox() {
  const objects = canvas.getObjects();

  if (objects.length === 0) {
    return null;
  }

  const firstObjectRect = objects[0]?.getBoundingRect();
  if (!firstObjectRect) {
    return null;
  }

  const contentsBoundingBox = {
    left: firstObjectRect.left,
    top: firstObjectRect.top,
    right: firstObjectRect.left + firstObjectRect.width,
    bottom: firstObjectRect.top + firstObjectRect.height,
  };

  objects.forEach((obj) => {
    const objRect = obj.getBoundingRect();
    if (!objRect) return;

    const objRight = objRect.left + objRect.width;
    const objBottom = objRect.top + objRect.height;

    contentsBoundingBox.left = Math.min(contentsBoundingBox.left, objRect.left);
    contentsBoundingBox.top = Math.min(contentsBoundingBox.top, objRect.top);
    contentsBoundingBox.right = Math.max(contentsBoundingBox.right, objRight);
    contentsBoundingBox.bottom = Math.max(
      contentsBoundingBox.bottom,
      objBottom
    );
  });

  return {
    ...contentsBoundingBox,
    width: Math.round(contentsBoundingBox.right - contentsBoundingBox.left),
    height: Math.round(contentsBoundingBox.bottom - contentsBoundingBox.top),
  };
}

function exportCanvas() {
  const crop = getCanvasContentBoundingBox();
  if (!crop) {
    console.warn("Nothing to export, canvas is empty.");
    return;
  }

  const zoom = canvas.getZoom(); // Get current zoom level
  const originalViewport = canvas.viewportTransform.slice();

  // Translate canvas to crop the bounding box
  canvas.setViewportTransform([1, 0, 0, 1, -crop.left, -crop.top]);

  // Use toSVG method for SVG export
  const svgContent = canvas.toSVG({
    width: canvas.width * 6, // Adjust width by zoom level
    height: canvas.height * 6, // Adjust height by zoom level
    left: 0,
    top: 0,
  });

  // Restore canvas state
  canvas.setViewportTransform(originalViewport);

  // Now svgContent contains the SVG markup
  console.log(svgContent); // You can use this for further processing or saving

  // Optionally, you can create a Blob or Data URL from the SVG string if you want to download it
  const svgBlob = new Blob([svgContent], { type: "image/svg+xml" });
  const svgUrl = URL.createObjectURL(svgBlob);
  console.log(svgUrl); // You can use this URL to create a download link or display the SVG
  // Example: To download the SVG
  const downloadLink = document.createElement("a");
  downloadLink.href = svgUrl;
  downloadLink.download = "exported_canvas.svg";
  downloadLink.click();
}

export default exportCanvas;
