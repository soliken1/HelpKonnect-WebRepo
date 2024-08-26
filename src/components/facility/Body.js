"use client";
import React from "react";
import Modal from "./AddFacilityModal";
import { useState } from "react";
function Body() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAddEvent = async (event) => {
    event.preventDefault();
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
  return (
    <div className="w-full flex flex-col p-10">
      <label className="text-lg font-bold">Subscribed Facilities</label>
      <label className="font-medium text-gray-400">
        Add Facilities or View Subscribed Facilities on the Application
      </label>
      <div className="flex justify-end">
        <button
          onClick={openModal}
          className="bg-green-400 mt-10 ps-10 pe-10 pt-2 pb-2 text-white font-semibold rounded-xl shadow-md shadow-gray-400"
        >
          Register Facility
        </button>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-2xl font-semibold mb-1">Add Facility</h2>
        <label className="text-gray-400 font-semibold">
          Add Subscribing Facility on the Platform
        </label>
        <div className="h-5/6 flex flex-col md:flex-row w-full mt-4 overflow-auto">
          <div className="md:w-96 h-full flex justify-center items-center">
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
                <img
                  src={imagePreview}
                  alt="Selected"
                  className="h-full w-full object-cover rounded-full"
                />
              ) : (
                <span className="md:text-sm font-semibold text-xs text-gray-500">
                  Click To Set An Image
                </span>
              )}
            </label>
          </div>
          <div className="md:w-2/3 h-full bg-red-200 px-10 py-4 md:py-0 md:mt-0 mt-5 rounded-md">
            <form className="pt-5" onSubmit={handleAddEvent}>
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
                  Username
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
                  Password
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
                  Facility Name
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
                  Facility Description
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
                  Facility Location
                </label>
              </div>
              <div className="relative h-12 flex items-center justify-center mt-2">
                <button
                  type="submit"
                  className="bg-green-400 ps-10 pe-10 pt-2 pb-2 text-white font-semibold rounded-xl shadow-md shadow-gray-400"
                >
                  Register Facility
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
      <div className="overflow-x-auto shadow-sm shadow-red-50 mt-5">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="py-3 px-4 bg-red-100 font-bold text-sm text-gray-600 border-b border-gray-300">
                Facility Name
              </th>
              <th className="py-3 px-4 bg-red-100 font-bold text-sm text-gray-600 border-b border-gray-300">
                No. Of Professionals
              </th>
              <th className="py-3 px-4 bg-red-100 font-bold text-sm text-gray-600 border-b border-gray-300">
                Total Successful Books
              </th>
              <th className="py-3 px-4 bg-red-100 font-bold text-sm text-gray-600 border-b border-gray-300">
                Generated Income
              </th>
              <th className="py-3 px-4 bg-red-100 font-bold text-sm text-gray-600 border-b border-gray-300">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-3 px-4 text-center text-gray-700 border-b border-gray-300">
                Sample Facility 1
              </td>
              <td className="py-3 px-4 text-center text-gray-700 border-b border-gray-300">
                20
              </td>
              <td className="py-3 px-4 text-center text-gray-700 border-b border-gray-300">
                50
              </td>
              <td className="py-3 px-4 text-center border-b text-green-600 border-gray-300">
                $1 000
              </td>
              <td className="py-3 px-4 text-center border-b text-green-600 border-gray-300">
                Active
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Body;
