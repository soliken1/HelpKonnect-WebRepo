"use client";
import React, { useEffect } from "react";
import CardContainer from "./CardContainer";
import { useState } from "react";
import AddModalBody from "./AddModalBody";
import { getCookie } from "cookies-next";
import { ToastContainer } from "react-toastify";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/configs/firebaseConfigs";
import { getStartOfWeek, getEndOfWeek } from "@/utils/convertDates";

function Body() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [events, setEvents] = useState([]);
  const [totalEvents, setTotalEvents] = useState(0);
  const [filterDate, setFilterDate] = useState("All");

  const today = new Date();
  const startOfWeek = getStartOfWeek(today);
  const endOfWeek = getEndOfWeek(today);

  useEffect(() => {
    setUserName(getCookie("user"));
    const fetchEvents = async () => {
      const eventsQuery = query(
        collection(db, "events"),
        where("facilityName", "==", userName)
      );
      const querySnapshot = await getDocs(eventsQuery);
      const eventsData = await Promise.all(
        querySnapshot.docs.map(async (docSnapshot) => {
          const event = docSnapshot.data();
          const eventDate = new Date(event.date);
          if (eventDate < today) {
            event.done = true;
            await updateDoc(doc(db, "events", docSnapshot.id), { done: true });
          }
          return event;
        })
      );
      setEvents(eventsData);
      setTotalEvents(querySnapshot.size);
    };
    fetchEvents();
  }, [userName]);

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    if (event.done) {
      return filterDate === "All";
    }
    if (filterDate === "Today") {
      return eventDate.toDateString() === today.toDateString();
    } else if (filterDate === "This Week") {
      return eventDate >= startOfWeek && eventDate <= endOfWeek;
    }
    return true;
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="w-full flex flex-col p-10">
      <label className="text-lg font-bold">Events</label>
      <label className="font-medium text-gray-400">
        Active Events, Webinars, or Sessions on {userName}
      </label>
      <div className="flex justify-between mt-5">
        <div className="flex flex-row gap-4">
          <button
            onClick={() => setFilterDate("All")}
            className={`ps-10 pe-10 pt-2 pb-2 rounded-full shadow-md hover:bg-red-300 hover:text-white duration-300 ${
              filterDate === "All" ? "bg-red-300 text-white" : ""
            }`}
          >
            All Events
          </button>
          <button
            onClick={() => setFilterDate("Today")}
            className={`ps-10 pe-10 pt-2 pb-2 rounded-full shadow-md hover:bg-red-300 hover:text-white duration-300 ${
              filterDate === "Today" ? "bg-red-300 text-white" : ""
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setFilterDate("This Week")}
            className={`ps-10 pe-10 pt-2 pb-2 rounded-full shadow-md hover:bg-red-300 hover:text-white duration-300 ${
              filterDate === "This Week" ? "bg-red-300 text-white" : ""
            }`}
          >
            This Week
          </button>
        </div>
        <button
          onClick={openModal}
          className="bg-green-400 hover:bg-green-500 duration-300 ps-10 pe-10 pt-2 pb-2 text-white font-semibold rounded-xl shadow-md"
        >
          Add Event
        </button>
      </div>
      <div className="w-full h-auto flex flex-row gap-5">
        <div className="w-1/3 h-full flex flex-col gap-5 mt-5">
          <div className="w-full h-32 bg-gradient-to-br items-start from-red-300 rounded-md flex flex-col to-pink-400 p-4 group shadow-md">
            <label className="text-white text-lg group-hover:scale-105 transition-transform duration-300">
              Total Active Events:
            </label>
            <label className="text-white text-6xl font-semibold group-hover:scale-105 transition-transform duration-300">
              {totalEvents}
            </label>
          </div>
          <div className="w-full h-32 bg-gradient-to-br items-start from-red-300 rounded-md flex flex-col to-pink-400 p-4 group shadow-md">
            <label className="text-white text-lg group-hover:scale-105 transition-transform duration-300">
              Total Active Participations:
            </label>
            <label className="text-white text-6xl font-semibold group-hover:scale-105 transition-transform duration-300">
              0
            </label>
          </div>
        </div>
        <CardContainer events={filteredEvents} />
      </div>
      <AddModalBody isModalOpen={isModalOpen} closeModal={closeModal} />
      <ToastContainer />
    </div>
  );
}

export default Body;
