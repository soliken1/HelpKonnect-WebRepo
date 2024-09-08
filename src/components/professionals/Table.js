"use client";
import React from "react";
import { useState } from "react";
import Modal from "./AddProfModal";

function Table() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAddProffssional = async (event) => {
    event.preventDefault();
  };

  return (
    <div className="w-full flex flex-col p-10">
      <label className="text-lg font-bold">Professionals</label>
      <label className="font-medium text-gray-400">
        Professional List on Sample Facility
      </label>
      <div className="flex justify-end mt-10 mb-4">
        <button
          onClick={openModal}
          className="bg-green-400 ps-10 pe-10 pt-2 pb-2 text-white font-semibold rounded-xl shadow-md shadow-gray-400"
        >
          Add Professional
        </button>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
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
            <img
              src="/SampleProfile.jpg"
              className="md:h-80 md:w-80 w-40 h-40 rounded-full shadow-md"
            />
          </div>
          <div className="md:w-2/3 md:mt-0 mt-5 bg-red-200 px-10 py-2 md:p-10 rounded-md">
            <form onSubmit={handleAddProffssional}>
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
              <div className="relative mt-7">
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
              <div className="w-full h-32 flex items-center justify-center">
                <button
                  type="submit"
                  className="bg-green-400 ps-10 pe-10 pt-2 pb-2 text-white font-semibold rounded-xl shadow-md shadow-gray-400"
                >
                  Add Professional
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
      <div className="overflow-x-auto shadow-sm shadow-red-50">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="py-3 px-4 bg-red-100 font-bold text-sm text-gray-600 border-b border-gray-300">
                Professional Name
              </th>
              <th className="py-3 px-4 bg-red-100 font-bold text-sm text-gray-600 border-b border-gray-300">
                Email
              </th>
              <th className="py-3 px-4 bg-red-100 font-bold text-sm text-gray-600 border-b border-gray-300">
                Qualification
              </th>
              <th className="py-3 px-4 bg-red-100 font-bold text-sm text-gray-600 border-b border-gray-300">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-3 px-4 text-center text-gray-700 border-b border-gray-300">
                John Doe
              </td>
              <td className="py-3 px-4 text-center text-gray-700 border-b border-gray-300">
                john.doe@example.com
              </td>
              <td className="py-3 px-4 text-center text-gray-700 border-b border-gray-300">
                Psychotherapist License
              </td>
              <td className="py-3 px-4 text-center border-b text-green-600 border-gray-300">
                Active
              </td>
            </tr>
            <tr>
              <td className="py-3 px-4 text-center text-gray-700 border-b border-gray-300">
                Jane Smith
              </td>
              <td className="py-3 px-4 text-center text-gray-700 border-b border-gray-300">
                jane.smith@example.com
              </td>
              <td className="py-3 px-4 text-center text-gray-700 border-b border-gray-300">
                Psychotherapist License
              </td>
              <td className="py-3 px-4 text-center border-b text-green-600 border-gray-300">
                Active
              </td>
            </tr>
            <tr>
              <td className="py-3 px-4 text-center text-gray-700 border-b border-gray-300">
                Michael Brown
              </td>
              <td className="py-3 px-4 text-center text-gray-700 border-b border-gray-300">
                michael.brown@example.com
              </td>
              <td className="py-3 px-4 text-center text-gray-700 border-b border-gray-300">
                Psychotherapist License
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

export default Table;
