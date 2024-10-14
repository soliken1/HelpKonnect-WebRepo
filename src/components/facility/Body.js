"use client";
import { useState, useEffect } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  doc,
  setDoc,
  getDocs,
  collection,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { db, auth } from "@/configs/firebaseConfigs";
import AddModalBody from "@/components/facility/AddModalBody.js";
import FacilityTable from "@/components/facility/FacilityTable.js";
import FacilityAnalytics from "@/components/facility/FacilityAnalytics.js";

function Body() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [facilities, setFacilities] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    facilityName: "",
    facilityDescription: "",
    facilityLocation: "",
    role: "facility",
    banned: false,
    dateCreated: serverTimestamp(),
  });
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [facilityDetails, setFacilityDetails] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
      setImageFile(null);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddEvent = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;

      await fetch("/api/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.uid,
          username: formData.facilityName,
        }),
      });

      const storage = getStorage();
      let imageUrl = "";

      if (imageFile) {
        const imageName = `${uuidv4()}.${imageFile.name.split(".").pop()}`;
        const storageRef = ref(storage, `facilities/${imageName}`);

        await uploadBytes(storageRef, imageFile);

        imageUrl = await getDownloadURL(storageRef);
      }

      const facilityData = {
        ...formData,
        imageUrl,
        userId: user.uid,
      };

      const setInitFacility = {
        prof: 0,
        books: 0,
        income: 0,
        status: true,
        userId: user.uid,
      };

      const docRef = doc(db, "credentials", user.uid);
      const facRef = doc(db, "facilities", user.uid);
      await setDoc(docRef, facilityData);
      await setDoc(facRef, setInitFacility);

      setFormData({
        email: "",
        facilityName: "",
        facilityDescription: "",
        facilityLocation: "",
      });
      setImagePreview(null);
      setImageFile(null);
      closeModal();
      window.location.reload();
    } catch (error) {
      console.error("Error registering facility:", error);
    }
  };

  const handleSelectFacility = async (facility) => {
    setSelectedFacility(facility);
    try {
      const credentialsDocRef = doc(db, "credentials", facility.userId);
      const credentialsDocSnap = await getDoc(credentialsDocRef);

      if (credentialsDocSnap.exists()) {
        setFacilityDetails(credentialsDocSnap.data());
        console.log(credentialsDocSnap.data());
      } else {
        console.log(`No credentials found for userId ${facility.userId}`);
        setFacilityDetails(null);
      }
    } catch (error) {
      console.error(
        `Error fetching credentials for userId ${facility.userId}:`,
        error
      );
      setFacilityDetails(null);
    }
  };

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const facilitiesSnapshot = await getDocs(collection(db, "facilities"));
        const facilitiesData = facilitiesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const facilitiesWithNames = await Promise.all(
          facilitiesData.map(async (facility) => {
            try {
              const credentialsDocRef = doc(db, "credentials", facility.userId);
              const credentialsDocSnap = await getDoc(credentialsDocRef);

              if (credentialsDocSnap.exists()) {
                const credentialsData = credentialsDocSnap.data();

                if (credentialsData.role && credentialsData.role === "user") {
                  return null;
                }

                return {
                  ...facility,
                  facilityName:
                    credentialsData.facilityName || "Unknown Facility Name",
                };
              } else {
                console.log(
                  `No credentials found for userId ${facility.userId}`
                );
                return null;
              }
            } catch (error) {
              console.error(
                `Error fetching credentials for userId ${facility.userId}:`,
                error
              );
              return null;
            }
          })
        );

        const filteredFacilities = facilitiesWithNames.filter(
          (facility) => facility !== null
        );

        setFacilities(filteredFacilities);
      } catch (error) {
        console.error("Error fetching facilities:", error);
      }
    };

    fetchFacilities();
  }, []);

  return (
    <div className="w-full flex flex-col p-10">
      <label className="text-lg font-bold">Subscribed Facilities</label>
      <label className="font-medium text-gray-400">
        Add Facilities or View Subscribed Facilities on the Application
      </label>
      <div className="flex justify-end">
        <button
          onClick={openModal}
          className="bg-green-400 hover:bg-green-500 transition-colors duration-300 mt-10 ps-10 pe-10 pt-2 pb-2 text-white font-semibold rounded-xl shadow-md shadow-gray-400"
        >
          Register Facility
        </button>
      </div>
      <AddModalBody
        isOpen={isModalOpen}
        onClose={closeModal}
        imagePreview={imagePreview}
        handleImageChange={handleImageChange}
        formData={formData}
        handleInputChange={handleInputChange}
        handleAddEvent={handleAddEvent}
      />
      <div className="flex flex-row gap-5 h-full">
        <FacilityTable
          facilities={facilities}
          onSelect={handleSelectFacility}
        />
        <FacilityAnalytics
          selectedFacility={selectedFacility}
          facilityDetails={facilityDetails}
        />
      </div>
    </div>
  );
}

export default Body;
