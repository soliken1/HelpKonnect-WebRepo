"use client";
import React, { useEffect } from "react";
import CardContainer from "./CardContainer";
import { useState } from "react";
import AddModalBody from "./AddModalBody";
import { getCookie } from "cookies-next";

function Body() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    setUserName(getCookie("user"));
  }, [userName]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="w-full flex flex-col p-10">
      <label className="text-lg font-bold">Events</label>
      <label className="font-medium text-gray-400">
        Active Events, Webinars, or Sessions on {userName}
      </label>
      <div className="flex justify-end">
        <button
          onClick={openModal}
          className="bg-green-400 hover:bg-green-500 duration-300 mt-10 ps-10 pe-10 pt-2 pb-2 text-white font-semibold rounded-xl shadow-md"
        >
          Add Event
        </button>
      </div>
      <div className="w-full h-auto flex flex-row gap-5">
        <div className="w-1/3 h-full flex flex-col gap-5">
          <div className="w-full h-32 bg-gradient-to-br items-start from-red-300 rounded-md flex flex-col to-pink-400 p-4 group shadow-md">
            <label className="text-white text-lg group-hover:scale-105 transition-transform duration-300">
              Total Active Events:
            </label>
            <label className="text-white text-6xl font-semibold group-hover:scale-105 transition-transform duration-300">
              100
            </label>
          </div>
          <div className="w-full h-32 bg-gradient-to-br items-start from-red-300 rounded-md flex flex-col to-pink-400 p-4 group shadow-md">
            <label className="text-white text-lg group-hover:scale-105 transition-transform duration-300">
              Total Active Participations:
            </label>
            <label className="text-white text-6xl font-semibold group-hover:scale-105 transition-transform duration-300">
              30
            </label>
          </div>
        </div>
        <CardContainer />
      </div>
      <AddModalBody isModalOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
}

export default Body;
