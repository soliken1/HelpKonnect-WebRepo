"use client";
import formatDate from "@/utils/formatDate";
import React from "react";
import { useState, useEffect } from "react";
import {
  query,
  getDocs,
  where,
  collection,
  doc,
  updateDoc,
  increment,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import { db } from "@/configs/firebaseConfigs";
import Link from "next/link";
import Image from "next/image";
function UserPosts({ userPosts, currentUser }) {
  const [likes, setLikes] = useState({});
  useEffect(() => {
    const fetchLikes = async () => {
      const likesSnapshot = await getDocs(
        query(collection(db, "likes"), where("userId", "==", currentUser))
      );
      const likesData = {};
      likesSnapshot.docs.forEach((doc) => {
        g = likesData[doc.data().postId] = true;
      });
      setLikes(likesData);
    };

    if (currentUser) fetchLikes();
  }, [currentUser]);

  const handleHeartReact = async (post) => {
    const postRef = doc(db, "community", post.id);
    const likeQuery = query(
      collection(db, "likes"),
      where("postId", "==", post.id),
      where("userId", "==", currentUser)
    );
    const likeSnapshot = await getDocs(likeQuery);

    if (likeSnapshot.empty) {
      await updateDoc(postRef, { heart: increment(1) });
      await addDoc(collection(db, "likes"), {
        postId: post.id,
        userId: currentUser,
      });
      setLikes((prev) => ({ ...prev, [post.id]: true }));
    } else {
      const likeDocRef = likeSnapshot.docs[0].ref;
      await updateDoc(postRef, { heart: increment(-1) });
      await deleteDoc(likeDocRef);
      setLikes((prev) => ({ ...prev, [post.id]: false }));
    }
  };

  return (
    <div className="w-full md:w-2/3 h-full flex flex-col gap-5 px-6 py-6 rounded-lg overflow-auto shadow-lg bg-white">
      {userPosts.map((post) => (
        <div key={post.id} className="flex flex-col gap-2">
          <div className="flex-row flex gap-2">
            <Image
              src={post.userProfile}
              className="w-12 h-12 rounded-full bg-gray-200"
              width={1920}
              height={1080}
              alt="User Profile"
            />
            <div className="flex flex-col">
              <div className="text-sm font-semibold">{post.username}</div>
              <div className="text-xs text-gray-600">
                {formatDate(post.time)}
              </div>
            </div>
          </div>
          <label className="font-normal">{post.caption}</label>
          <div className="w-full h-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {post.imageUrls?.map((url, index) => (
              <Image
                src={url}
                key={index}
                alt={`Post Image ${index + 1}`}
                className="object-cover w-64 h-64"
                width={1920}
                height={1080}
              />
            ))}
          </div>
          <div className="flex flex-row h-12 border-t-2">
            <button
              type="button"
              className="w-1/2 h-full flex flex-row justify-center items-center gap-5 border-e-2 hover:bg-gray-200 rounded-sm duration-200"
              onClick={() => handleHeartReact(post)}
            >
              <svg
                width="24"
                height="21"
                viewBox="0 0 24 21"
                fill={likes[post.id] ? "rgb(252 165 165)" : "none"}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.5266 3.05787C20.0159 2.54687 19.4095 2.14152 18.742 1.86495C18.0745 1.58839 17.3591 1.44604 16.6366 1.44604C15.9142 1.44604 15.1987 1.58839 14.5313 1.86495C13.8638 2.14152 13.2574 2.54687 12.7466 3.05787L11.6866 4.11787L10.6266 3.05787C9.59495 2.02618 8.19568 1.44658 6.73664 1.44658C5.27761 1.44658 3.87833 2.02618 2.84664 3.05787C1.81495 4.08956 1.23535 5.48884 1.23535 6.94787C1.23535 8.4069 1.81495 9.80618 2.84664 10.8379L3.90664 11.8979L11.6866 19.6779L19.4666 11.8979L20.5266 10.8379C21.0376 10.3271 21.443 9.72068 21.7196 9.05323C21.9961 8.38577 22.1385 7.67036 22.1385 6.94787C22.1385 6.22538 21.9961 5.50997 21.7196 4.84252C21.443 4.17506 21.0376 3.56863 20.5266 3.05787Z"
                  stroke="rgb(252 165 165)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <label className="cursor-pointer">
                {likes[post.id] ? post.heart + 1 : post.heart}
              </label>
            </button>
            <Link
              href={`/community/${post.id}`}
              type="button"
              className="w-1/2 h-full flex flex-row justify-center items-center gap-5 hover:bg-gray-200 rounded-sm duration-200"
            >
              <Image
                width={1920}
                height={1080}
                className="w-6 h-6"
                src="/Icons/CommentIcon.svg"
                alt="Comment Icon"
              />
              <label className="cursor-pointer">
                {post.commentCount}{" "}
                {post.commentCount > 1 ? "Comments" : "Comment"}
              </label>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserPosts;
