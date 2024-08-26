"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { getCookie } from "cookies-next";
import Detailform from "./Detailform";

function Body() {
  const [imagePreview, setImagePreview] = useState(null);
  const [username, setUsername] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  useEffect(() => {
    setUsername(getCookie("user"));
  }, []);

  return (
    <div className="w-full h-screen flex flex-col p-10 overflow-auto">
      <label className="text-lg font-bold">Profile</label>
      <label className="font-medium text-gray-400">
        Check or Modify Your Profile
      </label>
      <div className="w-full h-96 flex flex-col justify-center items-center mt-5">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          id="imageUpload"
          onChange={handleImageChange}
        />
        <label
          htmlFor="imageUpload"
          className="md:h-80 md:w-80 h-60 w-60 rounded-full shadow-md flex justify-center items-center bg-gray-200 cursor-pointer"
        >
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Selected"
              className="h-full w-full object-cover rounded-full"
            />
          ) : (
            <img
              src="SampleProfile.jpg"
              alt="Placeholder"
              className="h-full w-full object-cover rounded-full"
            />
          )}
        </label>
      </div>
      <Detailform username={username} />
    </div>
  );
}

export default Body;
