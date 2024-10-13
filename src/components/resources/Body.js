import React, { useEffect } from "react";
import Table from "./Table";
import Image from "next/image";
import AddModalBody from "./AddModalBody";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { getCookie } from "cookies-next";
import {
  collection,
  getDocs,
  where,
  query,
  doc,
  updateDoc,
  deleteField,
} from "firebase/firestore";
import { db } from "@/configs/firebaseConfigs";
import formatDate from "@/utils/formatDate";

function Body() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState(null);
  const [resources, setResources] = useState([]);
  const [selectedResource, setSelectedResource] = useState(null);
  const [filterType, setFilterType] = useState("All");

  useEffect(() => {
    const username = getCookie("user");
    setUsername(username);
    if (!username) return;
    const fetchResources = async () => {
      try {
        const resourceQuery = query(
          collection(db, "resources"),
          where("facilityName", "==", username)
        );
        const querySnapshot = await getDocs(resourceQuery);
        const resourcesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setResources(resourcesData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchResources();
  }, [username, selectedResource]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleRowClick = (resource) => {
    setSelectedResource(resource);
  };

  const handleApprove = async () => {
    if (!selectedResource) return;
    try {
      const resourceRef = doc(db, "resources", selectedResource.id);
      await updateDoc(resourceRef, {
        approved: true,
      });
      setSelectedResource({ ...selectedResource, approved: true });
    } catch (error) {
      console.error("Error approving resource: ", error);
    }
  };

  const handleDeny = async () => {
    if (!selectedResource) return;
    try {
      const resourceRef = doc(db, "resources", selectedResource.id);
      await updateDoc(resourceRef, {
        approved: deleteField(),
      });
      setSelectedResource({ ...selectedResource, approved: undefined });
    } catch (error) {
      console.error("Error denying resource: ", error);
    }
  };

  const filteredResources = resources.filter((resource) =>
    filterType === "All" ? true : resource.type === filterType
  );

  return (
    <div className="w-full flex flex-col p-10">
      <label className="text-lg font-bold">Resources</label>
      <label className="font-medium text-gray-400">
        Pending Mental Health Resources on Sample Facility
      </label>
      <div className="flex justify-between mt-5">
        <div className="flex flex-row gap-4">
          <button
            onClick={() => setFilterType("All")}
            className={`ps-10 pe-10 pt-2 pb-2  rounded-full shadow-md hover:bg-red-300 hover:text-white duration-300 ${
              filterType === "All" ? "bg-red-300 text-white" : ""
            }`}
          >
            All Resources
          </button>
          <button
            onClick={() => setFilterType("Video")}
            className={`ps-10 pe-10 pt-2 pb-2 rounded-full shadow-md hover:bg-red-300 hover:text-white duration-300 ${
              filterType === "Video" ? "bg-red-300 text-white" : ""
            }`}
          >
            Video
          </button>
          <button
            onClick={() => setFilterType("Audio")}
            className={`ps-10 pe-10 pt-2 pb-2 rounded-full shadow-md hover:bg-red-300 hover:text-white duration-300 ${
              filterType === "Audio" ? "bg-red-300 text-white" : ""
            }`}
          >
            Audio
          </button>
          <button
            onClick={() => setFilterType("E-book (pdf)")}
            className={`ps-10 pe-10 pt-2 pb-2 rounded-full shadow-md hover:bg-red-300 hover:text-white duration-300 ${
              filterType === "E-book (pdf)" ? "bg-red-300 text-white" : ""
            }`}
          >
            E-book (pdf)
          </button>
        </div>
        <button
          onClick={openModal}
          className="ps-10 pe-10 pt-2 pb-2 rounded-full shadow-md bg-green-400 hover:bg-green-500 text-white duration-300"
        >
          Add Resources
        </button>
      </div>
      <div className="flex flex-row gap-10 flex-nowrap h-full mt-5">
        <div className="overflow-x-auto shadow-md rounded-md w-8/12">
          <Table
            resources={filteredResources}
            onRowClick={setSelectedResource}
          />
        </div>
        <div className="flex-1 p-4 flex flex-col shadow-md rounded-md">
          {selectedResource ? (
            <>
              <Image
                src={selectedResource.imageURL || "/SampleProfile.jpg"}
                className="w-full h-60 object-contain"
                width={1920}
                height={1080}
                alt={selectedResource.name || "Sample Resource"}
              />
              <label className="text-2xl font-semibold mt-5">
                {selectedResource.name || "Resource Title"}
              </label>
              <div className="flex justify-between">
                <label className="mt-1 text-gray-600 text-sm">
                  {formatDate(selectedResource.time) || "Date Uploaded"}
                </label>
                <label className="mt-1 text-gray-600 text-sm">
                  {selectedResource.type || "Resource Type"}
                </label>
              </div>
              <label className="text-gray-600 mt-1 text-sm">
                {selectedResource.description || ""}
              </label>
              <div className="justify-center items-center flex-1 flex gap-4">
                {selectedResource.approved ? (
                  <>
                    <button className="bg-gray-400 hover:bg-gray-500 duration-300 text-white font-semibold rounded-xl px-10 py-2">
                      Approved
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleApprove}
                      className="bg-green-400 hover:bg-green-500 duration-300 text-white font-semibold rounded-xl px-10 py-2"
                    >
                      Approve
                    </button>
                    <button
                      onClick={handleDeny}
                      className="bg-red-400 hover:bg-red-500 duration-300 text-white font-semibold rounded-xl px-10 py-2"
                    >
                      Deny
                    </button>
                  </>
                )}
              </div>
            </>
          ) : (
            <label className="w-full h-full flex justify-center items-center text-gray-400">
              Select a resource to view details
            </label>
          )}
        </div>
      </div>
      <AddModalBody
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        username={username}
      />
      <ToastContainer />
    </div>
  );
}

export default Body;
