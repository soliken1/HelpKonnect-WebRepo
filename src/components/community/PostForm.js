"use client";
import React from "react";
import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, storage } from "@/configs/firebaseConfigs";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function PostForm({ userId, username, userProfile }) {
  const [images, setImages] = useState([]);
  const [postMessage, setPostMessage] = useState("");

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const selectedImages = files.slice(0, 5);
    setImages((prevImages) => [...prevImages, ...selectedImages].slice(0, 5));
  };

  const handleRemoveImage = (indexToRemove) => {
    setImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
  };

  const handlePostMessage = async (e) => {
    e.preventDefault();
    if (postMessage.trim() === "" && images.length === 0) return;

    try {
      const imageUrls = await Promise.all(
        images.map(async (image) => {
          const storageRef = ref(
            storage,
            `communityImages/${image.name}-${Date.now()}`
          );
          const uploadResult = await uploadBytes(storageRef, image);
          const downloadUrl = await getDownloadURL(uploadResult.ref);
          return downloadUrl;
        })
      );

      await addDoc(collection(db, "community"), {
        caption: postMessage,
        userId: userId,
        username: username,
        userProfile,
        userProfile,
        imageUrls,
        time: serverTimestamp(),
      });

      setPostMessage("");
      setImages([]);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="w-full h-full md:w-1/3 flex flex-col gap-2 px-3 py-6 shadow-md rounded-lg">
      <form className="gap-5 flex flex-col" onSubmit={handlePostMessage}>
        <div className="flex flex-row gap-2">
          <img className="w-10 h-10 rounded-full" src={userProfile} />
          <textarea
            value={postMessage}
            onChange={(e) => setPostMessage(e.target.value)}
            className="h-32 w-5/6 resize-none bg-gray-100 rounded-lg p-3"
            placeholder="Share To The Community"
          ></textarea>
        </div>
        <div className="flex flex-row gap-4">
          <label className="w-8 h-8 flex cursor-pointer">
            <input
              type="file"
              className="hidden"
              onChange={handleFileChange}
              multiple
              accept="image/*"
            />
            <img
              className="w-full h-full"
              src="/Icons/FileIcon.svg"
              alt="Upload Icon"
            />
          </label>
          <div className="bg-gray-100 w-5/6 h-24 rounded-md flex items-center justify-start gap-2 overflow-x-auto">
            {images.map((image, index) => (
              <div key={index} className="relative w-1/5 h-full">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Uploaded ${index + 1}`}
                  className="object-cover h-full w-full rounded-md"
                />
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-0 right-0 bg-red-300 text-white rounded-full h-4 w-4 flex items-center justify-center"
                >
                  <label className="text-xs cursor-pointer">X</label>
                </button>
              </div>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-red-300 text-white py-2 rounded-lg"
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default PostForm;