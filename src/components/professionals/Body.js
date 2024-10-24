"use client";
import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { getCookie } from "cookies-next";
import AddModalBody from "./AddModalBody";
import Table from "./Table";
import Stars from "@/components/general/Stars";
import Comments from "./Comments";

function Body() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const userName = getCookie("user");
    setUserName(userName);
  }, []);

  return (
    <div className="w-full flex flex-col p-10">
      <label className="text-lg font-bold">Professionals</label>
      <label className="font-medium text-gray-400">
        Professional List on {userName}
      </label>
      <div className="flex justify-between mt-10 mb-4">
        <button
          className="ps-10 pe-10 pt-2 pb-2 rounded-xl shadow-md hover:bg-red-300 hover:text-white duration-300"
          type="button"
        >
          Active
        </button>
        <button
          onClick={openModal}
          className="ps-10 pe-10 pt-2 pb-2 rounded-xl shadow-md bg-green-400 hover:bg-green-500 text-white duration-300"
        >
          Add Professional
        </button>
      </div>
      <AddModalBody isOpen={isModalOpen} onClose={closeModal} />
      <div className="flex flex-row gap-4 flex-nowrap h-full">
        <div className="overflow-x-auto shadow-md rounded-md w-9/12">
          <Table />
        </div>
        <div className="flex-1 h-full shadow-md flex flex-col items-center">
          <div className="flex flex-col gap-2 text-center w-full py-8 rounded-t-md from-red-300 to-pink-400 bg-gradient-to-br group">
            <label className="text-6xl text-white font-bold group-hover:scale-110 transition-transform duration-300">
              3
            </label>
            <label className="text-white group-hover:scale-110 transition-transform duration-300">
              Total Professionals
            </label>
          </div>
          <div className="flex-1 w-full p-4 flex-col flex">
            <div className="flex flex-row gap-2">
              <Image
                src="/SampleProfile.jpg"
                width={1920}
                height={1080}
                alt="Profile"
                className="rounded-full w-16 h-16"
              />
              <div className="flex flex-col">
                <label className="text-md font-semibold">John Doe</label>
                <label className="text-gray-400 text-sm">Psychotherapist</label>
                <label className="text-gray-400 text-sm">
                  john.doe@example.com
                </label>
              </div>
            </div>
            <Stars
              width={25}
              height={25}
              className={"items-center justify-center mt-2"}
            />
            <Comments />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Body;
