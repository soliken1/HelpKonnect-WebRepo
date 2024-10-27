import React, { useState } from "react";
import Modal from "./AddProfModal";
import Image from "next/image";
import { db } from "@/configs/firebaseConfigs";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import ProfessionalLoading from "../loaders/Professional/ProfessionalLoading";
import { toast, Bounce } from "react-toastify";

function AddModalBody({ isOpen, onClose, currentUser }) {
  const [username, setUsername] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [isFinding, setIsFinding] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleSearchUser = async (event) => {
    if (event.key === "Enter") {
      setIsFinding(true);
      event.preventDefault();
      console.log(`Fetching professional details for username: ${username}`);

      const userRef = query(
        collection(db, "credentials"),
        where("username", "==", username),
        where("role", "==", "Professional")
      );
      const snapshot = await getDocs(userRef);

      if (!snapshot.empty) {
        const userData = snapshot.docs[0].data();
        toast.success("Professional Found!", {
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
        setUserDetails(userData);
        setIsFinding(false);
      } else {
        toast.error("Professional Not Found!", {
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
        setIsFinding(false);
        setUserDetails(null);
      }
    }
  };

  const handleAddProfessional = async (event) => {
    event.preventDefault();
    setIsAdding(true);
    try {
      if (userDetails) {
        const userDocRef = doc(db, "credentials", userDetails.userId);
        await updateDoc(userDocRef, {
          associated: currentUser,
        });
        toast.success("Professional Successfully Associated!", {
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

        window.location.reload();
        setUsername("");
        setUserDetails(null);
      }
    } catch (error) {
      toast.success("Failed To Associate Professional!", {
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
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col">
        <label className="text-2xl font-semibold md:mb-1">
          Add Professional
        </label>
        <label className="text-gray-400 font-semibold">
          Add Professionals to your Facility
        </label>
      </div>

      <div className="h-5/6 flex flex-col md:flex-row w-full mt-4">
        <div className="md:w-96 w-full h-full flex justify-center items-center">
          {isFinding ? (
            <ProfessionalLoading />
          ) : (
            <Image
              src={userDetails ? userDetails.imageUrl : "/UserIcon.svg"}
              className="md:h-80 md:w-80 w-40 h-40 rounded-full shadow-md opacity-25"
              width={1920}
              height={1080}
              alt="Profile"
            />
          )}
        </div>
        <div className="md:w-2/3 md:mt-0 shadow-md bg-red-200 px-10 py-8 md:p-10 rounded-md">
          <form
            className="flex flex-col gap-5"
            onSubmit={handleAddProfessional}
          >
            <div className="relative">
              <input
                type="text"
                name="username"
                id="username_input"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-black rounded-lg border-1 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-red-300 focus:outline-none focus:ring-0 focus:border-red-300 peer"
                placeholder=" "
                autoComplete="off"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={handleSearchUser}
              />
              <label
                htmlFor="username_input"
                className="absolute text-sm font-semibold text-red-300 dark:text-red-300 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] bg-transparent px-2 peer-focus:px-2 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-100 peer-focus:-translate-y-8 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                Username
              </label>
            </div>
            {userDetails && (
              <>
                <div className="relative">
                  <input
                    type="text"
                    name="bio"
                    id="bio_input"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-black rounded-lg border-1 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-red-300 focus:outline-none focus:ring-0 focus:border-red-300 pointer-events-none opacity-50 peer"
                    placeholder=" "
                    autoComplete="off"
                    value={userDetails.bio}
                    readOnly
                  />
                  <label
                    htmlFor="bio_input"
                    className="absolute text-sm font-semibold text-red-300 dark:text-red-300 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] bg-transparent px-2 peer-focus:px-2 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-100 peer-focus:-translate-y-8 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                  >
                    Bio
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    name="dateCreated"
                    id="date_created_input"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-black rounded-lg border-1 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-red-300 focus:outline-none focus:ring-0 focus:border-red-300 pointer-events-none opacity-50 peer"
                    placeholder=" "
                    autoComplete="off"
                    value={userDetails.dateCreated}
                    readOnly
                  />
                  <label
                    htmlFor="date_created_input"
                    className="absolute text-sm font-semibold text-red-300 dark:text-red-300 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] bg-transparent px-2 peer-focus:px-2 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-100 peer-focus:-translate-y-8 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                  >
                    Date Created
                  </label>
                </div>
              </>
            )}
            <div className="w-full flex items-center justify-center">
              {isAdding ? (
                <ProfessionalLoading />
              ) : (
                <button
                  type="submit"
                  className="bg-green-400 ps-10 pe-10 pt-2 pb-2 text-white font-semibold rounded-xl shadow-md hover:bg-green-500 duration-300"
                  disabled={!userDetails}
                >
                  Add Professional
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
}

export default AddModalBody;
