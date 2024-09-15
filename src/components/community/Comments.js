"use client";
import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  orderBy,
} from "firebase/firestore";
import { db } from "@/configs/firebaseConfigs";
import formatDate from "@/utils/formatDate";

function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const q = query(
          collection(db, "comments"),
          where("postId", "==", postId),
          orderBy("time", "desc")
        );
        const querySnapshot = await getDocs(q);

        const commentsWithUserDetails = await Promise.all(
          querySnapshot.docs.map(async (commentDoc) => {
            const commentData = commentDoc.data();

            const userDocRef = doc(db, "credentials", commentData.userId);
            const userDocSnap = await getDoc(userDocRef);

            const userData = userDocSnap.exists()
              ? userDocSnap.data()
              : { username: "Unknown User" };

            return {
              ...commentData,
              username: userData.facilityName || "Unknown User",
              userProfile: userData.imageUrl || "",
            };
          })
        );

        setComments(commentsWithUserDetails);
        console.log(commentsWithUserDetails);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchComments();
    }
  }, [postId]);

  if (loading) {
    return <div className="animate-pulse w-full h-full"></div>;
  }

  if (comments.length === 0) {
    return <div>No comments available</div>;
  }

  return (
    <div className="comments-section">
      {comments.map((comment, index) => (
        <div key={index} className="comment-item flex gap-2 px-2 py-4 border-b">
          <img
            src={comment.userProfile || "/defaultProfileImage.png"}
            alt="User Profile"
            className="w-8 h-8 rounded-full"
          />
          <div className="flex flex-col">
            <div className="flex flex-row items-center gap-2">
              <label className="font-semibold">{comment.username}</label>
              <label className="text-xs text-gray-400">
                {formatDate(comment.time)}
              </label>
            </div>
            <label className="text-sm">{comment.comment}</label>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Comments;
