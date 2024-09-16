"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/configs/firebaseConfigs";

function FlagContent() {
  const { flaggedUser } = useParams();
  const [flaggedComments, setFlaggedComments] = useState([]);

  useEffect(() => {
    const fetchFlaggedComments = async () => {
      try {
        const q = query(
          collection(db, "flaggedAccounts"),
          where("userId", "==", flaggedUser)
        );
        const querySnapshot = await getDocs(q);

        const commentsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setFlaggedComments(commentsData);
      } catch (err) {
        console.error("Error fetching flagged comments: ", err);
      }
    };

    fetchFlaggedComments();
  }, [flaggedUser]);

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
        <button
          type="button"
          className="w-1/2 h-12 rounded-lg text-white shadow-md bg-red-400 hover:bg-red-600 duration-75"
        >
          Ban User
        </button>
        <button
          type="button"
          className="w-1/2 h-12  rounded-lg text-white shadow-md bg-green-400 hover:bg-green-600  duration-75"
        >
          Unflag User
        </button>
      </div>
    </div>
  );
}

export default FlagContent;
