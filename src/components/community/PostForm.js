"use client";
import React, { useEffect, useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, storage } from "@/configs/firebaseConfigs";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { handleModerationTest } from "@/configs/textFiltering";
import { ToastContainer } from "react-toastify";
import { toast, Bounce } from "react-toastify";
import PostSubmitting from "../loaders/Community/PostSubmitting";
import Image from "next/image";
import { fetchQuotes } from "@/configs/fetchQuotes";

function PostForm({ userId, username, userProfile }) {
  const [images, setImages] = useState([]);
  const [postMessage, setPostMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const getQuote = async () => {
      try {
        const randomQuote = await fetchQuotes();
        setQuote(`${randomQuote.quotes} - ${randomQuote.person}`);
      } catch (error) {
        console.error("Error fetching quote: ", error);
      }
    };

    getQuote();
  }, []);

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
    setLoading(true);
    e.preventDefault();

    if (postMessage.trim() === "" && images.length === 0) return;

    const result = await handleModerationTest(postMessage.trim());

    if (result.result.includes("*")) {
      toast.error(
        "Profanities are strictly prohibited on the Community, Please Refrain from doing so. You have been marked for moderation.",
        {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        }
      );

      try {
        await addDoc(collection(db, "flaggedAccounts"), {
          time: serverTimestamp(),
          userId: userId,
          comment: postMessage,
        });
      } catch (e) {
        console.error(e);
      }
      setPostMessage("");
      setLoading(false);
      return;
    }

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
        imageUrls,
        heart: 0,
        time: serverTimestamp(),
      });

      setPostMessage("");
      setImages([]);
      window.location.reload();
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="w-full h-full md:w-1/3 flex flex-col gap-2 px-3 py-6 shadow-md rounded-lg bg-white">
      <form className="gap-5 flex flex-col" onSubmit={handlePostMessage}>
        <div className="px-4 flex flex-col">
          <label className="font-bold">Community</label>
          <label className="font-normal text-sm text-gray-400">
            Share Your Thoughts On The Community
          </label>
        </div>
        <div className="flex flex-row gap-2">
          {userProfile === "" ? (
            <div className="w-10 h-10 rounded-full bg-red-300 animate-pulse"></div>
          ) : (
            <Image
              className="w-10 h-10 rounded-full"
              src={userProfile}
              width={1920}
              height={1080}
              alt={"User Profile"}
            />
          )}
          <textarea
            value={postMessage}
            onChange={(e) => setPostMessage(e.target.value)}
            className="h-32 w-5/6 resize-none bg-gray-100 rounded-lg p-3"
            placeholder="I'm feeling..."
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
            <Image
              className="w-10 h-10"
              src="/Icons/FileIcon.svg"
              alt="Upload Icon"
              width={20}
              height={20}
            />
          </label>
          <div className="bg-gray-100 w-5/6 h-24 rounded-md flex items-center justify-start gap-2 overflow-x-auto">
            {images.map((image, index) => (
              <div key={index} className="relative w-1/5 h-full">
                <Image
                  src={URL.createObjectURL(image)}
                  alt={`Uploaded ${index + 1}`}
                  className="object-cover h-full w-full rounded-md"
                  fill
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
        <div className="w-full px-20">
          <button
            type="submit"
            className="w-full bg-red-300  hover:bg-red-400 duration-300 text-white py-2 rounded-lg"
          >
            Post
          </button>
        </div>
        <div className="relative group">
          <Image
            src="/Logo/Logo.png"
            className="w-20 h-20 rounded-full absolute top-0 left-0 z-20 drop-shadow-md group-hover:scale-105 duration-300"
            width={1920}
            height={1080}
            alt="Logo Image"
          />
          <div className="text-start group-hover:shadow-md duration-300 flex-col text-gray-500 sha  h-40 mt-5 w-full flex p-12 z-10">
            <label className="text-black group-hover:scale-105 duration-300">
              Random Quote:
            </label>
            <label className="italic group-hover:scale-105 duration-300">
              {quote}
            </label>
          </div>
        </div>
      </form>
      <ToastContainer />
      {loading && <PostSubmitting />}
    </div>
  );
}

export default PostForm;
