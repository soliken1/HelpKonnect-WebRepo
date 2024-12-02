import React, { useState } from "react";
import Modal from "./AddResourceModal";
import Image from "next/image";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/configs/firebaseConfigs";
import { toast, Bounce } from "react-toastify";
import { ToastContainer } from "react-toastify";
import AddLoader from "../loaders/Resources/AddLoader";

function AddModalBody({ isModalOpen, closeModal, username }) {
  const [imagePreview, setImagePreview] = useState(null);
  const [resourceType, setResourceType] = useState("");
  const [file, setFile] = useState(null);
  const [resourceName, setResourceName] = useState("");
  const [resourceDescription, setResourceDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddEvent = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    if (
      !file ||
      !resourceType ||
      !resourceName ||
      !resourceDescription ||
      !imagePreview
    ) {
      toast.error("Please fill in all fields and select a file and an image.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      return;
    }

    try {
      const imageBlob = await fetch(imagePreview).then((res) => res.blob());
      const imageRef = ref(storage, `resourceImages/${file.name}`);
      await uploadBytes(imageRef, imageBlob);
      const imageURL = await getDownloadURL(imageRef);

      const fileRef = ref(storage, `resources/${file.name}`);
      await uploadBytes(fileRef, file);
      const fileURL = await getDownloadURL(fileRef);

      await addDoc(collection(db, "resources"), {
        name: resourceName,
        facilityName: username,
        description: resourceDescription,
        time: Timestamp.now(),
        type: resourceType,
        fileURL: fileURL,
        imageURL: imageURL,
        approved: true,
      });

      toast.success("Resource added Successfully", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      setIsLoading(false);
      window.location.reload();
      closeModal();
    } catch (error) {
      console.error("Error adding resource: ", error);
      toast.error("Failed to add resource. Please try again.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
    setIsLoading(false);
  };

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

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const getFileAcceptType = () => {
    switch (resourceType) {
      case "Video":
        return "video/mp4";
      case "E-book (pdf)":
        return "application/pdf";
      case "Audio":
        return "audio/mpeg";
      default:
        return "";
    }
  };

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-2xl font-semibold mb-1">Add Resource</h2>
        <label className="text-gray-400 font-semibold">
          For Users To Interact With Resources
        </label>
        <div className="md:h-5/6 flex flex-col md:flex-row w-full h-full md:mt-4 mt-2">
          <div className="md:w-96 h-52 md:h-full flex justify-center items-center">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="imageUpload"
              onChange={handleImageChange}
            />
            <label
              htmlFor="imageUpload"
              className="md:h-80 md:w-80 h-40 w-40 rounded-full shadow-md flex justify-center items-center bg-gray-200 cursor-pointer"
            >
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="Selected"
                  className="w-full h-full object-cover rounded-full"
                  width={1920}
                  height={1080}
                />
              ) : (
                <span className="md:text-base text-xs font-semibold text-gray-500">
                  Click To Add an Image
                </span>
              )}
            </label>
          </div>
          <div className="md:w-2/3 md:mt-0 mt-5 bg-red-200 shadow-md px-10 py-2 md:p-10 rounded-md">
            <form onSubmit={handleAddEvent}>
              <div className="relative mt-5">
                <input
                  type="text"
                  name="resourceName"
                  id="resourceName"
                  value={resourceName}
                  onChange={(e) => setResourceName(e.target.value)}
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-black rounded-lg border-1 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-red-300 focus:outline-none focus:ring-0 focus:border-red-300 peer"
                  placeholder=" "
                  autoComplete="off"
                />
                <label
                  htmlFor="resourceName"
                  className="absolute text-sm font-semibold text-red-300 dark:text-red-300 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] bg-transparent px-2 peer-focus:px-2 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-100 peer-focus:-translate-y-8 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                >
                  Resource Name
                </label>
              </div>
              <div className="relative mt-7">
                <input
                  type="text"
                  name="resourceDescription"
                  id="resourceDescription"
                  value={resourceDescription}
                  onChange={(e) => setResourceDescription(e.target.value)}
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-black rounded-lg border-1 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-red-300 focus:outline-none focus:ring-0 focus:border-red-300 peer"
                  placeholder=" "
                  autoComplete="off"
                />
                <label
                  htmlFor="resourceDescription"
                  className="absolute text-sm font-semibold text-red-300 dark:text-red-300 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] bg-transparent px-2 peer-focus:px-2 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-100 peer-focus:-translate-y-8 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                >
                  Resource Description
                </label>
              </div>
              <div className="relative mt-7">
                <select
                  name="resourceType"
                  id="resourceType"
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-black rounded-lg border-1 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-red-300 focus:outline-none focus:ring-0 focus:border-red-300 peer"
                  value={resourceType}
                  onChange={(e) => setResourceType(e.target.value)}
                >
                  <option value="" disabled>
                    Select Resource Type
                  </option>
                  <option value="Video">Video</option>
                  <option value="E-book (pdf)">E-book (pdf)</option>
                  <option value="Audio">Audio</option>
                </select>
                <label
                  htmlFor="resourceType"
                  className="absolute text-sm font-semibold text-red-300 dark:text-red-300 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] bg-transparent px-2 peer-focus:px-2 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-100 peer-focus:-translate-y-8 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                >
                  Resource Type
                </label>
              </div>
              <div className="relative mt-7 bg-white p-2 rounded-md">
                <input
                  type="file"
                  accept={getFileAcceptType()}
                  onChange={handleFileChange}
                  className="block w-full text-sm text-red-300 border-1 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-red-300 focus:outline-none focus:ring-0 focus:border-red-300 peer"
                />
              </div>
              <div className="w-full flex-1 flex items-center justify-center mt-5">
                <button
                  type="submit"
                  className="bg-green-400 hover:bg-green-500 duration-300 ps-10 pe-10 pt-2 pb-2 text-white font-semibold rounded-xl shadow-md"
                >
                  Add Resource
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
      {isLoading && <AddLoader />}
      <ToastContainer />
    </>
  );
}

export default AddModalBody;
