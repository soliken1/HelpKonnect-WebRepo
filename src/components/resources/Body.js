import React, { useEffect, useState } from "react";
import Table from "./Table";
import Image from "next/image";
import AddModalBody from "./AddModalBody";
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
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/configs/firebaseConfigs";
import formatDate from "@/utils/formatDate";
import { toast, Bounce } from "react-toastify";

function Body() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState(null);
  const [resources, setResources] = useState([]);
  const [selectedResource, setSelectedResource] = useState(null);
  const [filterType, setFilterType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

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
        console.error(error);
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

  const handleDeleteResource = async () => {
    if (!selectedResource) return;
    try {
      const resourceRef = doc(db, "resources", selectedResource.id);

      await deleteDoc(resourceRef);

      setResources((prevResources) =>
        prevResources.filter((resource) => resource.id !== selectedResource.id)
      );

      setSelectedResource(null);

      toast.success("Resource deleted successfully", {
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
      console.error("Error deleting resource: ", error);
    }
  };

  const filteredResources = resources
    .filter((resource) => {
      const resourceName = resource.name.toLowerCase();
      return resourceName.includes(searchQuery.toLowerCase());
    })
    .filter((resource) =>
      filterType === "All" ? true : resource.type === filterType
    );

  const cycleFilterType = () => {
    const filterTypes = ["All", "Video", "Audio", "E-book (pdf)"];
    const currentIndex = filterTypes.indexOf(filterType);
    const nextIndex = (currentIndex + 1) % filterTypes.length;
    setFilterType(filterTypes[nextIndex]);
  };

  return (
    <div className="w-full flex flex-col p-10">
      <label className="text-lg font-bold">Resources</label>
      <label className="font-medium text-gray-400">
        Pending Mental Health Resources on Sample Facility
      </label>
      <div className="flex justify-between mt-5">
        <div className="flex flex-row gap-4">
          <button
            onClick={cycleFilterType}
            className="ps-10 pe-10 pt-2 pb-2 rounded-full shadow-md hover:bg-red-300 hover:text-white duration-300"
          >
            {filterType}
          </button>
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
                src={selectedResource.imageURL || "/UserIcon.svg"}
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
                  <div className="flex flex-col justify-center items-center gap-4">
                    <a
                      href={selectedResource.fileURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      <button className="bg-blue-400 w-full hover:bg-blue-500 duration-300 text-white font-semibold rounded-xl px-10 py-2">
                        View Resource
                      </button>
                    </a>
                    <button
                      className="bg-red-400 hover:bg-red-500 duration-300 text-white font-semibold rounded-xl px-10 py-2"
                      onClick={handleDeleteResource}
                    >
                      Delete Resource
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4 justify-center items-center">
                    <a
                      href={selectedResource.fileURL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className="bg-blue-400 hover:bg-blue-500 duration-300 text-white font-semibold rounded-xl px-10 py-2">
                        View Resource
                      </button>
                    </a>
                    <div className="flex flex-row gap-4">
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
                    </div>
                  </div>
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
