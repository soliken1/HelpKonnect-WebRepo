"use client";
import React, { useState, useEffect } from "react";
import { getCookie, setCookie } from "cookies-next";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db, storage } from "@/configs/firebaseConfigs";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

function Body() {
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");
  const [isEditable, setIsEditable] = useState({
    username: false,
    description: false,
    location: false,
    contact: false,
  });
  const [userId, setUserId] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setImageFile(file);
      setImagePreview(null);
    }
  };

  useEffect(() => {
    setUsername(getCookie("user"));
    setProfile(getCookie("userProfile"));
    setUserId(getCookie("userId"));
    setDescription(getCookie("userDescription"));
    setLocation(getCookie("userLocation"));
    setContact(getCookie("userEmail"));
  }, []);

  const toggleEditable = (field) => {
    setIsEditable((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const uploadImageToFirebase = async () => {
    if (!imageFile) return null;

    const imageName = `${uuidv4()}.${imageFile.name.split(".").pop()}`;
    const storageRef = ref(storage, `facilities/${imageName}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        null,
        (error) => reject(error),
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = profile;
      if (imageFile) {
        imageUrl = await uploadImageToFirebase();
      }

      const docRef = doc(db, "credentials", userId);
      await updateDoc(docRef, {
        facilityName: username,
        facilityDescription: description,
        facilityLocation: location,
        facilityContacts: contact,
        imageUrl: imageUrl,
      });
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();

        setCookie("user", userData.facilityName);
        setCookie("userProfile", userData.imageUrl);
        setCookie("userDescription", userData.facilityDescription);
        setCookie("userLocation", userData.facilityLocation);
        setCookie("userEmail", userData.facilityContacts);

        alert("Profile updated successfully!");
      } else {
        alert("Failed to update your profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="w-full h-screen flex flex-col p-10 overflow-auto">
      <label className="text-lg font-bold">Profile</label>
      <label className="font-medium text-gray-400">
        Check or Modify Your Profile
      </label>

      <div className="w-full h-96 flex flex-col justify-center items-center mt-5">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          id="imageUpload"
          onChange={handleImageChange}
        />
        <label
          htmlFor="imageUpload"
          className="md:h-80 md:w-80 h-60 w-60 rounded-full shadow-md flex justify-center items-center bg-gray-200 cursor-pointer"
        >
          {imagePreview ? (
            <img
              src={imagePreview || profile}
              alt="Selected"
              className="h-full w-full object-cover rounded-full"
            />
          ) : (
            <img
              src={profile || "SampleProfile.jpg"}
              alt="Placeholder"
              className="h-full w-full object-cover rounded-full"
            />
          )}
        </label>
      </div>

      <div className="h-96 mt-5 md:px-4">
        <form className="h-auto flex flex-col" onSubmit={handleSaveChanges}>
          <div className="flex flex-row justify-center items-center gap-5">
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="text-3xl font-semibold text-center w-auto h-10 rounded-full bg-white enabled:border-2 border-black"
              disabled={!isEditable.username}
              autoComplete="off"
            />
            <button type="button" onClick={() => toggleEditable("username")}>
              <img
                className="w-6 h-6 object-scale-down"
                src="/Icons/EditIcon.png"
                alt="Edit"
              />
            </button>
          </div>

          <div className="flex flex-row h-auto mt-7 md:px-4 pb-5">
            <div className="flex flex-col gap-7 w-1/3">
              <label className="text-lg font-semibold">Description: </label>
              <label className="text-lg font-semibold">Location: </label>
              <label className="text-lg font-semibold">Contact Number: </label>
            </div>

            <div className="flex flex-col gap-9 md:w-full">
              <div className="flex flex-row gap-9">
                <input
                  type="text"
                  className="w-5/6 bg-white text-start enabled:border-2 border-black rounded-full px-2"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={!isEditable.description}
                />
                <button
                  type="button"
                  onClick={() => toggleEditable("description")}
                >
                  <img
                    className="w-6 h-6 object-scale-down"
                    src="/Icons/EditIcon.png"
                    alt="Edit"
                  />
                </button>
              </div>

              <div className="flex flex-row gap-9">
                <input
                  type="text"
                  className="w-5/6 bg-white text-start enabled:border-2 border-black rounded-full px-2"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  disabled={!isEditable.location}
                />
                <button
                  type="button"
                  onClick={() => toggleEditable("location")}
                >
                  <img
                    className="w-6 h-6 object-scale-down"
                    src="/Icons/EditIcon.png"
                    alt="Edit"
                  />
                </button>
              </div>

              <div className="flex flex-row gap-9">
                <input
                  type="text"
                  className="w-5/6 bg-white text-start enabled:border-2 border-black rounded-full px-2"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  disabled={!isEditable.contact}
                />
                <button type="button" onClick={() => toggleEditable("contact")}>
                  <img
                    className="w-6 h-6 object-scale-down"
                    src="/Icons/EditIcon.png"
                    alt="Edit"
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Save Changes Button */}
          <div className="w-full h-10 flex items-center justify-center mt-5">
            <button
              type="submit"
              className="bg-green-400 px-10 pt-2 pb-2 text-white font-semibold rounded-xl shadow-md shadow-gray-400"
            >
              Apply Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Body;
