import React from "react";
import Image from "next/image";
import Modal from "@/components/facility/AddFacilityModal.js";

function AddModalBody({
  isOpen,
  onClose,
  imagePreview,
  handleImageChange,
  formData,
  handleInputChange,
  handleAddEvent,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
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
              <Image
                src={imagePreview}
                alt="Selected"
                className="h-full w-full object-cover rounded-full"
                width={1920}
                height={1080}
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
                type="email"
                name="email"
                id="email"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-black rounded-lg border-1 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-red-300 focus:outline-none focus:ring-0 focus:border-red-300 peer"
                placeholder=" "
                autoComplete="off"
                value={formData.email}
                onChange={handleInputChange}
                required={true}
              />
              <label
                htmlFor="email"
                className="absolute text-sm font-semibold text-red-300 dark:text-red-300 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] bg-transparent px-2 peer-focus:px-2 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-100 peer-focus:-translate-y-8 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                Email
              </label>
            </div>
            <div className="relative mt-7">
              <input
                type="password"
                name="password"
                id="password"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-black rounded-lg border-1 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-red-300 focus:outline-none focus:ring-0 focus:border-red-300 peer"
                placeholder=" "
                autoComplete="off"
                value={formData.password}
                onChange={handleInputChange}
                required={true}
              />
              <label
                htmlFor="password"
                className="absolute text-sm font-semibold text-red-300 dark:text-red-300 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] bg-transparent px-2 peer-focus:px-2 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-100 peer-focus:-translate-y-8 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                Password
              </label>
            </div>
            <div className="relative mt-7">
              <input
                type="text"
                name="facilityName"
                id="facilityName"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-black rounded-lg border-1 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-red-300 focus:outline-none focus:ring-0 focus:border-red-300 peer"
                placeholder=" "
                autoComplete="off"
                value={formData.facilityName}
                onChange={handleInputChange}
                required={true}
              />
              <label
                htmlFor="facilityName"
                className="absolute text-sm font-semibold text-red-300 dark:text-red-300 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] bg-transparent px-2 peer-focus:px-2 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-100 peer-focus:-translate-y-8 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                Facility Name
              </label>
            </div>
            <div className="relative mt-7">
              <input
                type="text"
                name="facilityDescription"
                id="facilityDescription"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-black rounded-lg border-1 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-red-300 focus:outline-none focus:ring-0 focus:border-red-300 peer"
                placeholder=" "
                autoComplete="off"
                value={formData.facilityDescription}
                onChange={handleInputChange}
                required={true}
              />
              <label
                htmlFor="facilityDescription"
                className="absolute text-sm font-semibold text-red-300 dark:text-red-300 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] bg-transparent px-2 peer-focus:px-2 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-100 peer-focus:-translate-y-8 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                Facility Description
              </label>
            </div>
            <div className="relative mt-7">
              <input
                type="text"
                name="facilityLocation"
                id="facilityLocation"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-black rounded-lg border-1 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-red-300 focus:outline-none focus:ring-0 focus:border-red-300 peer"
                placeholder=" "
                autoComplete="off"
                value={formData.facilityLocation}
                onChange={handleInputChange}
                required={true}
              />
              <label
                htmlFor="facilityLocation"
                className="absolute text-sm font-semibold text-red-300 dark:text-red-300 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] bg-transparent px-2 peer-focus:px-2 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-100 peer-focus:-translate-y-8 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                Facility Location
              </label>
            </div>
            <div className="relative h-12 flex items-center justify-center mt-2">
              <button
                type="submit"
                className="bg-green-400 ps-10 pe-10 pt-2 pb-2 text-white font-semibold rounded-xl shadow-md hover:bg-green-500 duration-300"
              >
                Register Facility
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
}

export default AddModalBody;
