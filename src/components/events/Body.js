"use client";
import React from "react";
import CardContainer from "./CardContainer";
import Modal from "./AddEventModal";
import { useState } from "react";

function Body() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAddEvent = async (event) => {
    event.preventDefault();
  };

  const [imagePreview, setImagePreview] = useState(null);

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
  return (
    <div className="w-full flex flex-col p-10">
      <label className="text-lg font-bold">Events</label>
      <label className="font-medium text-gray-400">
        Active Events, Webinars, or Sessions on Sample Facility
      </label>
      <div className="flex justify-end">
        <button
          onClick={openModal}
          className="bg-green-400 mt-10 ps-10 pe-10 pt-2 pb-2 text-white font-semibold rounded-xl shadow-md shadow-gray-400"
        >
          Add Event
        </button>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-2xl font-semibold mb-1">Add Events</h2>
        <label className="text-gray-400 font-semibold">
          For Posting To Users on Help-Konnect To Participate In
        </label>
        <div className="h-5/6 flex flex-row w-full mt-4">
          <div className="w-96 h-full flex justify-center items-center">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="imageUpload"
              onChange={handleImageChange}
            />
            <label
              htmlFor="imageUpload"
              className="h-80 w-80 rounded-full shadow-md flex justify-center items-center bg-gray-200 cursor-pointer"
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Selected"
                  className="h-full w-full object-cover rounded-full"
                />
              ) : (
                <span className="text-gray-500">Click To Set An Image</span>
              )}
            </label>
          </div>
          <div className="w-2/3 bg-red-200 p-10 rounded-md">
            <form onSubmit={handleAddEvent}>
              <div className="relative mt-5">
                <input
                  type="text"
                  name="text"
                  id="floating_outlined"
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
                  name="text"
                  id="floating_outlined"
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
                  name="text"
                  id="floating_outlined"
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
              <div className="flex flex-row justify-between mt-7">
                <div className="relative">
                  <input
                    type="number"
                    name="text"
                    id="floating_outlined"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-black rounded-lg border-1 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-red-300 focus:outline-none focus:ring-0 focus:border-red-300 peer"
                    placeholder=" "
                    autoComplete="off"
                  />
                  <label
                    htmlFor="floating_outlined"
                    className="absolute text-sm font-semibold text-red-300 dark:text-red-300 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] bg-transparent px-2 peer-focus:px-2 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-100 peer-focus:-translate-y-8 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                  >
                    Accomodation
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="date"
                    name="text"
                    id="floating_outlined"
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
              <div className="w-full h-10 flex items-center justify-center mt-7">
                <button
                  type="submit"
                  className="bg-green-400 ps-10 pe-10 pt-2 pb-2 text-white font-semibold rounded-xl shadow-md shadow-gray-400"
                >
                  Add Event
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
      <CardContainer />
    </div>
  );
}

export default Body;
