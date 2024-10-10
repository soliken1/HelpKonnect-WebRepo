"use client";
import React from "react";
import CardContainer from "./CardContainer";
import { useState } from "react";
import AddModalBody from "./AddModalBody";

function Body() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="w-full flex flex-col p-10">
      <label className="text-lg font-bold">Events</label>
      <label className="font-medium text-gray-400">
        Active Events, Webinars, or Sessions on Sample Facility
      </label>
      <div className="flex justify-end">
        <button
          onClick={openModal}
          className="bg-green-400 hover:bg-green-500 duration-300 mt-10 ps-10 pe-10 pt-2 pb-2 text-white font-semibold rounded-xl shadow-md shadow-gray-400"
        >
          Add Event
        </button>
      </div>
      <CardContainer />
      <AddModalBody isModalOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
}

export default Body;
