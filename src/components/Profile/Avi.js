import React, { useState } from "react";
import { Avatar } from "@material-ui/core";

const Avi = () => {
  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);
  const [fileSrc, setFileSrc] = useState("");
  const handleImageUpload = (e) => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="edit-avatar">
      <img
        className="profile-img"
        src="https://apsec.iafor.org/wp-content/uploads/sites/37/2017/02/IAFOR-Blank-Avatar-Image.jpg"
        alt=""
        ref={uploadedImage}
      />
      <input
        className="file-btn"
        onChange={handleImageUpload}
        type="file"
        accept="image/*"
        multiple={false}
      />
    </div>
  );
};

export default Avi;
