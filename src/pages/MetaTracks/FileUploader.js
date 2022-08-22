import React, { useRef } from "react";

export const FileUploader = ({ onFileSelect }) => {
  const fileInput = useRef(null);

  const handleFileInput = (e) => {
    // handle validations
    onFileSelect(e.target.files[0]);

    const file = e.target.files[0];
    // if (file.size > 1024)
    //   onFileSelectError({ error: "File size cannot exceed more than 1MB" });
    // else {onFileSelectSuccess(file)};
  };

  return (
    <>
      <div className="file-uploader">
        <input type="file" onChange={handleFileInput} />
        <button
          onClick={(e) => fileInput.current && fileInput.current.click()}
          className="btn btn-primary"
        ></button>
      </div>
    </>
  );
};
