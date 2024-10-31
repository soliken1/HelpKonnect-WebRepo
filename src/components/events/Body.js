"use client";
import React, { useEffect, useMemo, useState } from "react";
import CardContainer from "./CardContainer";
import AddModalBody from "./AddModalBody";
import { getCookie } from "cookies-next";
import { ToastContainer } from "react-toastify";
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/configs/firebaseConfigs";
import { getStartOfWeek, getEndOfWeek } from "@/utils/convertDates";
import Pulser from "../loaders/Events/Pulser";
import {
  getTotalParticipants,
  getSpecificParticipants,
} from "@/utils/fetchParticipants";
import ParticipantsModal from "./ParticipantsModal";

function Body() {
  const [isParticipantsModalOpen, setIsParticipantsModalOpen] = useState(false);
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [events, setEvents] = useState([]);
  const [totalEvents, setTotalEvents] = useState(0);
  const [filterDate, setFilterDate] = useState("All");
  const [totalParticipants, setTotalParticipants] = useState(0);
  const [selectedEventParticipants, setSelectedEventParticipants] = useState(
    []
  );
  const [userInfo, setUserInfo] = useState([]);

  const today = useMemo(() => new Date(), []);
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
          event.countParticipants = await getSpecificParticipants(
            userName,
            event.name
          );
          return event;
        })
      );
      setEvents(eventsData);
      setTotalEvents(querySnapshot.size);
      setTotalParticipants(await getTotalParticipants(userName));
    };
    fetchEvents();
  }, [userName, today]);

  const handleEventClick = async (event) => {
    const participants = await getSpecificParticipants(userName, event.name);
    setSelectedEventParticipants(participants);

    const eventParticipantsQuery = query(
      collection(db, "participated"),
      where("eventName", "==", event.name)
    );
    const querySnapshot = await getDocs(eventParticipantsQuery);
    const eventParticipantsData = querySnapshot.docs.map((doc) => doc.data());

    console.log("Participants for event:", event.name, eventParticipantsData);

    const userIds = eventParticipantsData.map(
      (participant) => participant.userId
    );
    const userDetailsPromises = userIds.map(async (userId) => {
      const userQuery = query(
        collection(db, "credentials"),
        where("userId", "==", userId)
      );
      const userSnapshot = await getDocs(userQuery);
      return userSnapshot.docs.map((doc) => doc.data());
    });

    const userDetailsArray = await Promise.all(userDetailsPromises);

    const userInfo = userDetailsArray.flat().map((user) => ({
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      imageUrl: user.imageUrl,
    }));

    console.log("User details:", userInfo);

    setUserInfo(userInfo);
    setIsParticipantsModalOpen(true);
  };

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

  const openAddEventModal = () => setIsAddEventModalOpen(true);
  const closeAddEventModal = () => setIsAddEventModalOpen(false);
  const closeParticipantsModal = () => setIsParticipantsModalOpen(false);

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
          onClick={openAddEventModal}
          className="bg-green-400 hover:bg-green-500 duration-300 ps-10 pe-10 pt-2 pb-2 text-white font-semibold rounded-xl shadow-md"
        >
          Add Event
        </button>
      </div>
      <div className="w-full h-auto flex flex-row gap-5">
        <div className="w-1/3 h-full flex flex-col gap-5 mt-5">
          <div className="w-full h-32 bg-gradient-to-br items-start from-red-300 rounded-md flex flex-col to-pink-400 p-4 group shadow-md">
            <label className="text-white text-lg group-hover:scale-105 transition-transform duration-300">
              Total Events:
            </label>
            {totalEvents ? (
              <label className="text-white text-6xl font-semibold group-hover:scale-105 transition-transform duration-300">
                {totalEvents}
              </label>
            ) : (
              <Pulser
                classes={
                  "h-6 w-1/2 bg-white animate-pulse duration-300 rounded-full mt-5"
                }
              />
            )}
          </div>
          <div className="w-full h-32 bg-gradient-to-br items-start from-red-300 rounded-md flex flex-col to-pink-400 p-4 group shadow-md">
            <label className="text-white text-lg group-hover:scale-105 transition-transform duration-300">
              Total Participations:
            </label>
            {totalParticipants ? (
              <label className="text-white text-6xl font-semibold group-hover:scale-105 transition-transform duration-300">
                {totalParticipants}
              </label>
            ) : (
              <Pulser
                classes={
                  "h-6 w-1/2 bg-white animate-pulse duration-300 rounded-full mt-5"
                }
              />
            )}
          </div>
        </div>
        <CardContainer
          events={filteredEvents}
          onEventClick={handleEventClick}
        />
      </div>
      <ParticipantsModal
        isOpen={isParticipantsModalOpen}
        onRequestClose={closeParticipantsModal}
        participants={selectedEventParticipants}
        userInfo={userInfo}
      />
      <AddModalBody
        isModalOpen={isAddEventModalOpen}
        closeModal={closeAddEventModal}
      />
      <ToastContainer />
    </div>
  );
}

export default Body;
