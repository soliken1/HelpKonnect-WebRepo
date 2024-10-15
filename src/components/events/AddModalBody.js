import React, { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "@/configs/firebaseConfigs";
import Modal from "./AddEventModal";
import Image from "next/image";
import { toast, Bounce } from "react-toastify";
import { getCookie } from "cookies-next";
import AddLoader from "../loaders/Events/AddLoader";

function AddModalBody({ isModalOpen, closeModal }) {
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventVenue, setEventVenue] = useState("");
  const [accommodation, setAccommodation] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddEvent = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    if (!imageFile) {
      toast.error("Please Select an Image", {
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
      const imageRef = ref(storage, `eventImages/${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      const imageUrl = await getDownloadURL(imageRef);
      const facilityName = getCookie("user");

      await addDoc(collection(db, "events"), {
        name: eventName,
        description: eventDescription,
        venue: eventVenue,
        accommodation,
        date: eventDate,
        timeStart,
        timeEnd,
        imageUrl,
        facilityName,
        done: false,
      });

      toast.success("Successfully Added an Event", {
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

      setImagePreview(null);
      setImageFile(null);
      setEventName("");
      setEventDescription("");
      setEventVenue("");
      setAccommodation("");
      setEventDate("");
      setTimeStart("");
      setTimeEnd("");

      closeModal();
      setIsLoading(false);
      window.location.reload();
    } catch (error) {
      console.error("Error adding event: ", error);
      toast.error("Failed To Add an Event", {
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
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
      setImageFile(null);
    }
  };

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-2xl font-semibold mb-1">Add Events</h2>
        <label className="text-gray-400 font-semibold">
          For Posting To Users on Help-Konnect To Participate In
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
                  Click To Set An Image
                </span>
              )}
            </label>
          </div>
          <div className="md:w-2/3 md:mt-0 mt-5 bg-red-200 shadow-md px-10 py-2 md:p-10 rounded-md">
            <form onSubmit={handleAddEvent}>
              <div className="relative mt-5">
                <input
                  type="text"
                  name="eventName"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-black rounded-lg border-1 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-red-300 focus:outline-none focus:ring-0 focus:border-red-300 peer"
                  placeholder=" "
                  autoComplete="off"
                />
                <label
                  htmlFor="floating_outlined"
                  className="absolute text-sm font-semibold text-red-300 dark:text-red-300 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] bg-transparent px-2 peer-focus:px-2 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-100 peer-focus:-translate-y-8 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                >
                  Event Name
                </label>
              </div>
              <div className="relative mt-7">
                <input
                  type="text"
                  name="eventDescription"
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-black rounded-lg border-1 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-red-300 focus:outline-none focus:ring-0 focus:border-red-300 peer"
                  placeholder=" "
                  autoComplete="off"
                />
                <label
                  htmlFor="floating_outlined"
                  className="absolute text-sm font-semibold text-red-300 dark:text-red-300 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] bg-transparent px-2 peer-focus:px-2 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-100 peer-focus:-translate-y-8 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                >
                  Event Description
                </label>
              </div>
              <div className="relative mt-7">
                <input
                  type="text"
                  name="eventVenue"
                  value={eventVenue}
                  onChange={(e) => setEventVenue(e.target.value)}
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-black rounded-lg border-1 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-red-300 focus:outline-none focus:ring-0 focus:border-red-300 peer"
                  placeholder=" "
                  autoComplete="off"
                />
                <label
                  htmlFor="floating_outlined"
                  className="absolute text-sm font-semibold text-red-300 dark:text-red-300 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] bg-transparent px-2 peer-focus:px-2 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-100 peer-focus:-translate-y-8 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                >
                  Event Venue
                </label>
              </div>
              <div className="flex flex-row justify-between mt-7 gap-5">
                <div className="relative w-1/2">
                  <input
                    type="number"
                    name="accommodation"
                    value={accommodation}
                    onChange={(e) => setAccommodation(e.target.value)}
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-black rounded-lg border-1 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-red-300 focus:outline-none focus:ring-0 focus:border-red-300 peer"
                    placeholder=" "
                    autoComplete="off"
                  />
                  <label
                    htmlFor="floating_outlined"
                    className="absolute text-sm font-semibold text-red-300 dark:text-red-300 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] bg-transparent px-2 peer-focus:px-2 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-100 peer-focus:-translate-y-8 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                  >
                    Accommodation
                  </label>
                </div>
                <div className="relative w-1/2">
                  <input
                    type="date"
                    name="eventDate"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-black rounded-lg border-1 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-red-300 focus:outline-none focus:ring-0 focus:border-red-300 peer"
                    placeholder=" "
                    autoComplete="off"
                  />
                  <label
                    htmlFor="floating_outlined"
                    className="absolute text-sm font-semibold text-red-300 dark:text-red-300 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] bg-transparent px-2 peer-focus:px-2 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-100 peer-focus:-translate-y-8 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                  >
                    Event Date
                  </label>
                </div>
              </div>
              <div className="flex flex-row justify-between mt-7 gap-5">
                <div className="relative w-1/2">
                  <input
                    type="time"
                    name="timeStart"
                    value={timeStart}
                    onChange={(e) => setTimeStart(e.target.value)}
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-black rounded-lg border-1 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-red-300 focus:outline-none focus:ring-0 focus:border-red-300 peer"
                    placeholder=" "
                    autoComplete="off"
                  />
                  <label
                    htmlFor="floating_outlined"
                    className="absolute  text-sm font-semibold text-red-300 dark:text-red-300 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] bg-transparent px-2 peer-focus:px-2 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-100 peer-focus:-translate-y-8 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                  >
                    Start Time
                  </label>
                </div>
                <div className="relative w-1/2">
                  <input
                    type="time"
                    name="timeEnd"
                    value={timeEnd}
                    onChange={(e) => setTimeEnd(e.target.value)}
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-black rounded-lg border-1 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-red-300 focus:outline-none focus:ring-0 focus:border-red-300 peer"
                    placeholder=" "
                    autoComplete="off"
                  />
                  <label
                    htmlFor="floating_outlined"
                    className="absolute text-sm font-semibold text-red-300 dark:text-red-300 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] bg-transparent px-2 peer-focus:px-2 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-100 peer-focus:-translate-y-8 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                  >
                    End Time
                  </label>
                </div>
              </div>
              <div className="w-full h-10 flex items-center justify-center mt-5">
                <button
                  type="submit"
                  className="bg-green-400 hover:bg-green-500 duration-300 ps-10 pe-10 pt-2 pb-2 text-white font-semibold rounded-xl shadow-md"
                >
                  Add Event
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
      {isLoading && <AddLoader />}
    </>
  );
}

export default AddModalBody;
