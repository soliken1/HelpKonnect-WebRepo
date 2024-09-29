"use client";
import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  getDocs,
  where,
  limit,
} from "firebase/firestore";
import { db } from "@/configs/firebaseConfigs";
import Link from "next/link";
import FlagListLoader from "../loaders/Moderation/FlagListLoader";
import Image from "next/image";
function FlagList() {
  const [flaggedUsers, setFlaggedUsers] = useState([]);

  useEffect(() => {
    const fetchFlaggedUsers = async () => {
      try {
        const flaggedQuery = query(
          collection(db, "flaggedAccounts"),
          orderBy("time", "desc")
        );

        const flaggedSnapshot = await getDocs(flaggedQuery);
        const flaggedMap = new Map();

        for (const doc of flaggedSnapshot.docs) {
          const flagged = doc.data();
          const userId = flagged.userId;

          if (!flaggedMap.has(userId)) {
            const userDoc = await getDocs(
              query(
                collection(db, "credentials"),
                where("userId", "==", userId),
                limit(1)
              )
            );
            const userData = userDoc.docs[0]?.data();

            flaggedMap.set(userId, {
              userId,
              imageUrl: userData.imageUrl,
              name: userData?.facilityName || userData?.username || "Unknown",
              comment: flagged.comment,
              time: flagged.time.toDate(),
            });
          }
        }
        const usersArray = Array.from(flaggedMap.values());
        console.log("Fetched Flagged Users:", usersArray);
        setFlaggedUsers(usersArray);
      } catch (error) {
        console.error("Error fetching flagged users:", error);
      }
    };

    fetchFlaggedUsers();
  }, []);

  return (
    <div className="flex flex-col md:w-3/12 md:h-full rounded-lg shadow-md">
      <label className="text-black font-bold text-xl px-4 pt-4">
        Flagged Users
      </label>
      <div className="mt-4">
        {flaggedUsers.length > 0 ? (
          flaggedUsers.map((user) => (
            <Link
              href={`/moderation/${user.userId}`}
              key={user.userId}
              className="p-4 border-b-2 flex flex-row items-center gap-3 cursor-pointer hover:bg-gray-100 duration-100"
            >
              <Image
                className="h-12 w-12 object-contain rounded-full"
                src={user.imageUrl}
                width={1920}
                height={1080}
                alt="User Profile"
              />
              <div className="flex flex-col">
                <label className="font-semibold cursor-pointer">
                  {user.name}
                </label>
                <label className="text-sm text-gray-600 cursor-pointer">
                  {user.comment}
                </label>
                <label className="text-xs text-gray-400 cursor-pointer">
                  {user.time.toLocaleString()}
                </label>
              </div>
            </Link>
          ))
        ) : (
          <FlagListLoader />
        )}
      </div>
    </div>
  );
}

export default FlagList;
