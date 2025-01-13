import React, { useContext, useEffect, useState } from "react";
import { ToolContext } from "../../context/ToolContext";

const Uploads = () => {
  const { addShape } = useContext(ToolContext);
  const [imageUploaded, setImageUploaded] = useState([]);
  const [imageCanvas, setImageCanvas] = useState([]);

  const handelFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files).map((file) =>
      URL.createObjectURL(file)
    );
    setImageUploaded((prev) => [...prev, ...uploadedFiles]);
    setImageCanvas(e.target.files[0]);
    let reader = new FileReader();
    reader.onload = (e) => {
      let imageUrl = e.target.result;
    };
  };

  const addImageClick = (e, imgsrc) => {
    addShape("image", imgsrc);
  };

  useEffect(() => {}, [imageUploaded, imageCanvas]);

  return (
    <div className="elementsWrapper uploadsContainer">
      <h4>Uploads</h4>
      <hr className="default" />
      {imageUploaded && imageUploaded.length > 0 ? (
        <div className="elementsContainer uploadedImages">
          {imageUploaded.map((img) => (
            <div className="image-uplod" key={img}>
              <img
                src={img}
                alt="uploaded"
                onClick={(e) => addImageClick(e, img)}
              />
            </div>
          ))}
        </div>
      ) : (
        <p>There isn't uploaded images yet...</p>
      )}
      <div className="bigFlatButtonContainer">
        <input
          type="file"
          id="file"
          className="uploadUserImages"
          accept="image/*"
          multiple=""
          onChange={handelFileUpload}
        />
        <label
          type="file"
          className="bigFlatButton bigFlatButton--blue userUploadsLabel"
        >
          Upload
        </label>
        <button
          className="bigFlatButton bigFlatButton--blue uploadFromUrl"
          data-mdl-target="mdl-upload-from-url"
        ></button>
      </div>
    </div>
  );
};

export default Uploads;
