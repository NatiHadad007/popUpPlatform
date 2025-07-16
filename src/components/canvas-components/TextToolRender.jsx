import React, { useState, useRef, useEffect } from "react";

const TextToolRender = ({ shape, shapePos }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState("HELLO WORLD");
  const editableRef = useRef(null);

  if (!shape || shape.elementType !== "TextTool") return null;

  const handleInput = () => {
    setText(editableRef.current.innerText);
  };

  const handleClick = () => {
    if (!isEditing) {
      setIsEditing(true);
    }
  };

  useEffect(() => {
    if (isEditing && editableRef.current) {
      editableRef.current.focus();

      // Optional: place caret at end
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(editableRef.current);
      range.collapse(false);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }, [isEditing]);

  useEffect(() => {
    if (editableRef.current && !isEditing) {
      editableRef.current.innerText = text;
    }
  }, [text, isEditing]);

  return (
    <span
      ref={editableRef}
      contentEditable={isEditing}
      suppressContentEditableWarning
      onClick={handleClick}
      onInput={handleInput}
      style={{
        fontFamily: shape.type,
        color: shape.color,
        height: "100%",
        width: "100%",
        textAlign: "center",
        fontSize: `${shapePos.height / 4}px`,
        zIndex: shape.ShapeLayer,
        overflowWrap: "break-word",
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        outline: "none",
        cursor: "text",
        userSelect: isEditing ? "text" : "none",
        whiteSpace: "pre-wrap",
      }}
    />
  );
};

export default TextToolRender;
