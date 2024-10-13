"use client";
import {
  doc,
  getDocs,
  getDoc,
  collection,
  query,
  where,
} from "firebase/firestore";
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
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    setCurrentUser(getCookie("userId"));
    const fetchUser = async () => {
      if (!userId || !currentUser) return;

      try {
        const docRef = doc(db, "credentials", userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setUser(userData);
        } else {
          console.log("No such document!");
        }

        const postsRef = collection(db, "community");
        const q = query(postsRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const fetchedPosts = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setUserPosts((prevPosts) => {
            if (JSON.stringify(prevPosts) !== JSON.stringify(fetchedPosts)) {
              return fetchedPosts;
            }
            return prevPosts;
          });
        } else {
          console.log("No Posts Found");
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
          <UserPosts userPosts={userPosts} currentUser={currentUser} />
        </div>
      ) : (
        <ProfileLoading />
      )}
    </div>
  );
}

export default UserBody;
