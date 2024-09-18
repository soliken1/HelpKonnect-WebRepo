"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  getDoc,
  orderBy,
} from "firebase/firestore";
import { db } from "@/configs/firebaseConfigs";

function FlagContent() {
  const { flaggedUser } = useParams();
  const [flaggedComments, setFlaggedComments] = useState([]);
  const [isBanned, setIsBanned] = useState(false);

  useEffect(() => {
    const fetchFlaggedComments = async () => {
      try {
        const q = query(
          collection(db, "flaggedAccounts"),
          where("userId", "==", flaggedUser),
          orderBy("time", "desc")
        );

        const querySnapshot = await getDocs(q);

        const commentsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setFlaggedComments(commentsData);
        console.log(commentsData);
      } catch (err) {
        console.error("Error fetching flagged comments: ", err);
      }
    };
    const fetchUserStatus = async () => {
      try {
        const userRef = doc(db, "credentials", flaggedUser);
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          setIsBanned(userData.banned || false);
        }
      } catch (err) {
        console.error("Error fetching user status: ", err);
      }
    };

    fetchFlaggedComments();
    fetchUserStatus();
  }, [flaggedUser]);

  const handleBanUser = async () => {
    try {
      const userRef = doc(db, "credentials", flaggedUser);

      await updateDoc(userRef, { banned: true });
      setIsBanned(true);

      console.log(`User with ID: ${flaggedUser} has been banned.`);
    } catch (err) {
      console.error("Error banning user: ", err);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-white rounded-lg shadow-md p-4">
      <h1 className="text-xl font-bold mb-4">Flagged Comments for User</h1>
      <div className="flex flex-col h-5/6 py-2">
        {flaggedComments.length === 0 ? (
          <p>No flagged comments for this user.</p>
        ) : (
          flaggedComments.map((comment) => (
            <div key={comment.id} className="border-b p-2">
              <p>
                <strong>Comment:</strong> {comment.comment}
              </p>
              <p>
                <strong>Flagged at:</strong>{" "}
                {new Date(comment.time.seconds * 1000).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
      <div className="w-full flex-1 flex flex-row gap-5">
        {isBanned ? (
          <span className="w-full h-12 flex justify-center items-center rounded-lg text-white shadow-md bg-gray-400">
            User is Banned
          </span>
        ) : (
          <button
            type="button"
            onClick={handleBanUser}
            className="w-full h-12 rounded-lg text-white shadow-md bg-red-400 hover:bg-red-600 duration-75"
          >
            Ban User
          </button>
        )}
      </div>
    </div>
  );
}

export default FlagContent;
