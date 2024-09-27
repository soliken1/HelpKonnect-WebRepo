"use client";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import UserProfile from "./UserProfile";
import { db } from "@/configs/firebaseConfigs";
import ProfileLoading from "../loaders/Profile/ProfileLogin";
import { getCookie } from "cookies-next";
import UserPosts from "./UserPosts";

function UserBody() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState("");
  useEffect(() => {
    setCurrentUser(getCookie("userId"));
    const fetchUser = async () => {
      if (!userId && currentUser) return;
      try {
        const docRef = doc(db, "credentials", userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setUser(userData);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [userId, currentUser]);

  return (
    <div className="w-full h-full flex flex-col p-10">
      {user ? (
        <div className="w-full h-full flex gap-5 flex-col md:flex-row mt-5">
          <UserProfile user={user} currentUser={currentUser} />
          <UserPosts />
        </div>
      ) : (
        <ProfileLoading />
      )}
    </div>
  );
}

export default UserBody;
