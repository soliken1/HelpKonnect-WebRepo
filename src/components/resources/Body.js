import React from "react";
import Table from "./Table";
import Image from "next/image";
import AddModalBody from "./AddModalBody";
import { useState } from "react";

function Body() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <div className="w-full flex flex-col p-10">
      <label className="text-lg font-bold">Resources</label>
      <label className="font-medium text-gray-400">
        Pending Mental Health Resources on Sample Facility
      </label>
      <div className="w-full flex justify-between">
        <button className="ps-10 pe-10 pt-2 pb-2 rounded-xl shadow-md hover:bg-red-300 hover:text-white duration-300 mt-5">
          All Resources
        </button>
        <button
          onClick={openModal}
          className="ps-10 pe-10 pt-2 pb-2 rounded-xl shadow-md bg-green-400 hover:bg-green-500 text-white duration-300 mt-5"
        >
          Add Resoruces
        </button>
      </div>
      <div className="flex flex-row gap-10 flex-nowrap h-full mt-5">
        <div className="overflow-x-auto shadow-md rounded-md w-8/12">
          <Table />
        </div>
        <div className="flex-1 p-4 flex flex-col shadow-md rounded-md">
          <Image
            src="/Images/sampleresource.jpg"
            className="w-full h-60 object-contain"
            width={1920}
            height={1080}
            alt="Sample Resource"
          />
          <label className="text-2xl font-semibold mt-5">
            Man's Search For Meaning
          </label>
          <div className="flex justify-between">
            <label className="mt-1 text-gray-600 text-sm">1/1/2024</label>
            <label className="mt-1 text-gray-600 text-sm">E-Book</label>
          </div>
          <label className="text-gray-600 mt-1 text-sm">
            Man's Search for Meaning is a 1946 book by Viktor Frankl chronicling
            his experiences as a prisoner in Nazi concentration camps during
            World War II, and describing his psychotherapeutic method, which ...
          </label>
          <div className="justify-center items-center flex-1 flex gap-4">
            <button className="bg-green-400 hover:bg-green-500 duration-300 text-white font-semibold rounded-xl px-10 py-2">
              Approve
            </button>
            <button className="bg-red-400 hover:bg-red-500 duration-300 text-white font-semibold rounded-xl px-10 py-2">
              Deny
            </button>
          </div>
        </div>
      </div>
      <AddModalBody isModalOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
}

export default Body;
