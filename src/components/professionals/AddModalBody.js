import React from "react";
import Modal from "./AddProfModal";
import Image from "next/image";
function AddModalBody({ isOpen, onClose }) {
  const handleAddProffssional = async (event) => {
    event.preventDefault();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col">
        <label className="text-2xl font-semibold md:mb-1">
          Add Professional
        </label>
        <label className="text-gray-400 font-semibold">
          Add Pending Professionals on the Applying on Your Facility
        </label>
      </div>

      <div className="h-5/6 flex flex-col md:flex-row w-full mt-4">
        <div className="md:w-96 w-full h-full flex justify-center items-center">
          <Image
            src="/UserIcon.svg"
            className="md:h-80 md:w-80 w-40 h-40 rounded-full shadow-md"
            width={1920}
            height={1080}
            alt="Profile"
          />
        </div>
        <div className="md:w-2/3 md:mt-0 shadow-md bg-red-200 px-10 py-8 md:p-10 rounded-md">
          <form
            className="flex flex-col gap-5"
            onSubmit={handleAddProffssional}
          >
            <div className="relative">
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
            <div className="relative">
              <input
                type="text"
                name="text"
                id="floating_outlined"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-black rounded-lg border-1 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-red-300 focus:outline-none focus:ring-0 focus:border-red-300 pointer-events-none opacity-50 peer"
                placeholder=" "
                autoComplete="off"
              />
              <label
                htmlFor="floating_outlined"
                className="absolute text-sm font-semibold text-red-300 dark:text-red-300 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] bg-transparent px-2 peer-focus:px-2 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-100 peer-focus:-translate-y-8 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                License
              </label>
            </div>
            <div className="relative">
              <input
                type="text"
                name="text"
                id="floating_outlined"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-black rounded-lg border-1 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-red-300 focus:outline-none focus:ring-0 focus:border-red-300 pointer-events-none opacity-50 peer"
                placeholder=" "
                autoComplete="off"
              />
              <label
                htmlFor="floating_outlined"
                className="absolute text-sm font-semibold text-red-300 dark:text-red-300 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] bg-transparent px-2 peer-focus:px-2 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-100 peer-focus:-translate-y-8 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                Gender
              </label>
            </div>
            <div className="w-full flex items-center justify-center">
              <button
                type="submit"
                className="bg-green-400 ps-10 pe-10 pt-2 pb-2 text-white font-semibold rounded-xl shadow-md hover:bg-green-500 duration-300"
              >
                Add Professional
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
}

export default AddModalBody;
