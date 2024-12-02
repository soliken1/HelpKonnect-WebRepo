"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getCookie } from "cookies-next";
import AddModalBody from "./AddModalBody";
import Table from "./Table";
import Stars from "@/components/general/Stars";
import { db } from "@/configs/firebaseConfigs";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ToastContainer } from "react-toastify";
import { toast, Bounce } from "react-toastify";

function Body() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [professionals, setProfessionals] = useState([]);
  const [selectedProfessional, setSelectedProfessional] = useState(null);
  const facilityId = getCookie("userId");
  const [professionalsRef, setProfessionalsRef] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const userName = getCookie("user");
    setUserName(userName);
    setCurrentUser(facilityId);

    const fetchProfessionals = async () => {
      const ref = query(
        collection(db, "credentials"),
        where("associated", "==", facilityId),
        where("role", "==", "Professional")
      );
      setProfessionalsRef(ref);
      const snapshot = await getDocs(ref);
      const fetchedProfessionals = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProfessionals(fetchedProfessionals);
    };

    fetchProfessionals();
  }, [facilityId]);

  const handleProfessionalSelect = (professional) => {
    setSelectedProfessional(professional);
  };

  const handleRemoveProfessional = async (event) => {
    event.preventDefault();
    if (selectedProfessional) {
      const professionalRef = doc(db, "credentials", selectedProfessional.id);

      try {
        await updateDoc(professionalRef, {
          associate: "",
        });

        const snapshot = await getDocs(professionalsRef);
        const fetchedProfessionals = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProfessionals(fetchedProfessionals);

        toast.success("Professional Removed Successfully", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      } catch (error) {
        toast.error("Error Removing Professional! Try Again", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
    }
  };

  const handleRateUpdate = async (event) => {
    event.preventDefault();
    if (selectedProfessional) {
      const updatedRate = event.target.rate.value;
      const parsedRate = parseFloat(updatedRate);

      const professionalRef = doc(db, "credentials", selectedProfessional.id);

      try {
        await updateDoc(professionalRef, {
          rate: parsedRate,
        });

        const snapshot = await getDocs(professionalsRef);
        const fetchedProfessionals = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProfessionals(fetchedProfessionals);

        toast.success("Professional Rate Updated Successfully", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      } catch (error) {
        toast.error("Error Updating Rate!, Try Again", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
    }
  };

  const filteredProfessionals = professionals.filter((professional) =>
    professional.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full flex flex-col p-10">
      <label className="text-lg font-bold">Professionals</label>
      <label className="font-medium text-gray-400">
        Professional List on {userName}
      </label>
      <div className="flex justify-between mt-10 mb-4">
        <div className="flex flex-row gap-5">
          <input
            type="text"
            placeholder="Search"
            className="shadow-md rounded-full py-2 px-6 placeholder:text-black"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button
          onClick={openModal}
          className="ps-10 pe-10 pt-2 pb-2 rounded-xl shadow-md bg-green-400 hover:bg-green-500 text-white duration-300"
        >
          Add Professional
        </button>
      </div>
      <AddModalBody
        isOpen={isModalOpen}
        onClose={closeModal}
        currentUser={currentUser}
      />
      <div className="flex flex-row gap-4 flex-nowrap h-full">
        <div className="overflow-x-auto shadow-md rounded-md w-9/12">
          <Table
            professionals={filteredProfessionals}
            onSelect={handleProfessionalSelect}
          />
        </div>
        <div className="flex-1 h-full shadow-md flex flex-col items-center">
          <div className="flex flex-col gap-2 text-center w-full py-8 rounded-t-md from-red-300 to-pink-400 bg-gradient-to-br group">
            <label className="text-6xl text-white font-bold group-hover:scale-110 transition-transform duration-300">
              {professionals.length}
            </label>
            <label className="text-white group-hover:scale-110 transition-transform duration-300">
              Total Professionals
            </label>
          </div>
          <div className="flex-1 w-full p-4 flex-col flex">
            {selectedProfessional && (
              <>
                <div className="flex flex-row gap-2">
                  <Image
                    src={selectedProfessional.imageUrl || "/SampleProfile.jpg"}
                    width={1920}
                    height={1080}
                    alt="Profile"
                    className="rounded-full object-cover w-16 h-16"
                  />
                  <div className="flex flex-col">
                    <label className="text-md font-semibold">
                      {selectedProfessional.username}
                    </label>
                    <label className="text-gray-400 text-sm">
                      {selectedProfessional.qualification || "No Qualification"}
                    </label>
                    <label className="text-gray-400 text-sm">
                      {selectedProfessional.email}
                    </label>
                  </div>
                </div>
                <div className="mt-5 w-full flex items-center justify-center flex-col gap-2 debug">
                  <label className="font-semibold">Update Rate</label>
                  <form
                    className="flex flex-col gap-5 debug"
                    onSubmit={handleRateUpdate}
                  >
                    <input
                      name="rate"
                      className="text-center placeholder:text-black"
                      placeholder={`₱${selectedProfessional.rate}`}
                      type="number"
                      min={0}
                      style={{ appearance: "textfield" }}
                    />
                    <button className="px-2 py-2 bg-green-400 hover:bg-green-500 text-white rounded-xl shadow-md duration-300">
                      Update Rate
                    </button>
                  </form>
                  <button className="px-2 py-2 w-full bg-red-400 hover:bg-red-500 text-white rounded-xl shadow-md duration-300">
                    Remove Professional
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Body;
