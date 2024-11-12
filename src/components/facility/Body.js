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
import AddLoader from "@/components/loaders/Facility/AddLoader.js";
import { getCoordinates } from "@/utils/getCoordinates";

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
    facilityCoordinates: null,
    role: "facility",
    banned: false,
    dateCreated: serverTimestamp(),
  });
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [facilityDetails, setFacilityDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
    setIsLoading(true);
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
      const facilityCoordinates = await getCoordinates(
        formData.facilityLocation
      );

      const facilityData = {
        ...formData,
        imageUrl,
        userId: user.uid,
        facilityCoordinates,
      };

      const setInitFacility = {
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
        facilityCoordinates: null,
      });
      setImagePreview(null);
      setImageFile(null);
      closeModal();
      setIsLoading(false);
      window.location.reload();
    } catch (error) {
      console.error("Error registering facility:", error);
      setIsLoading(false);
    }
  };

  const handleSelectFacility = async (facility) => {
    setSelectedFacility(facility);
    try {
      const credentialsDocRef = doc(db, "credentials", facility.userId);
      const credentialsDocSnap = await getDoc(credentialsDocRef);

      if (credentialsDocSnap.exists()) {
        setFacilityDetails(credentialsDocSnap.data());
      } else {
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
        const credentialsSnapshot = await getDocs(
          collection(db, "credentials")
        );
        const credentialsData = credentialsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const bookingsSnapshot = await getDocs(collection(db, "bookings"));
        const bookingsData = bookingsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const bookingsCount = bookingsData.reduce((acc, booking) => {
          const facilityName = booking.facilityName;
          acc[facilityName] = (acc[facilityName] || 0) + 1;

          return acc;
        }, {});

        const generatedIncome = bookingsData.reduce((acc, booking) => {
          const facilityName = booking.facilityName;
          acc[facilityName] = (acc[facilityName] || 0) + (booking.amount || 0);
          return acc;
        }, {});

        const facilitiesWithNames = await Promise.all(
          credentialsData.map(async (credential) => {
            try {
              if (
                (credential.role && credential.role === "user") ||
                credential.role === "admin" ||
                credential.role === "Professional"
              ) {
                return null;
              }

              const associatedProfessionalsCount = credentialsData.filter(
                (prof) =>
                  prof.associated === credential.userId &&
                  prof.role === "Professional"
              ).length;

              const facilityDocRef = doc(db, "facilities", credential.userId);
              const facilityDocSnap = await getDoc(facilityDocRef);

              if (facilityDocSnap.exists()) {
                const facilityData = facilityDocSnap.data();
                return {
                  ...facilityData,
                  facilityName:
                    credential.facilityName || "Unknown Facility Name",
                  totalProfessionals: associatedProfessionalsCount,
                  totalBookings: bookingsCount[credential.facilityName] || 0,
                  generated: generatedIncome[credential.facilityName] || 0,
                };
              } else {
                console.error(
                  `No facility found for userId ${credential.userId}`
                );
                return null;
              }
            } catch (error) {
              console.error(
                `Error processing credential for userId ${credential.userId}:`,
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

  const filteredFacilities = facilities.filter((facility) =>
    facility.facilityName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full flex flex-col p-10">
      <label className="text-lg font-bold">Subscribed Facilities</label>
      <label className="font-medium text-gray-400">
        Add Facilities or View Subscribed Facilities on the Application
      </label>
      <div className="flex justify-between mt-10">
        <div className="flex flex-row gap-2">
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
          className="bg-green-400 hover:bg-green-500 transition-colors duration-300 ps-10 pe-10 pt-2 pb-2 text-white font-semibold rounded-xl shadow-md shadow-gray-400"
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
          facilities={filteredFacilities}
          onSelect={handleSelectFacility}
        />
        <FacilityAnalytics
          selectedFacility={selectedFacility}
          facilityDetails={facilityDetails}
        />
      </div>
      {isLoading && <AddLoader />}
    </div>
  );
}

export default Body;
