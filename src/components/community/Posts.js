import React, { useState, useEffect } from "react";
import {
  doc,
  updateDoc,
  increment,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/configs/firebaseConfigs";
import formatDate from "@/utils/formatDate";
import ImageModal from "./ImageModal";
import Link from "next/link";

function Posts({ posts, userId }) {
  const [modalImage, setModalImage] = useState(null);
  const [likes, setLikes] = useState({});

  useEffect(() => {
    const fetchLikes = async () => {
      const likesSnapshot = await getDocs(
        query(collection(db, "likes"), where("userId", "==", userId))
      );
      const likesData = {};
      likesSnapshot.docs.forEach((doc) => {
        likesData[doc.data().postId] = true;
      });
      setLikes(likesData);
    };

    if (userId) fetchLikes();
  }, [userId]);

  const handleImageClick = (url) => {
    setModalImage(url);
  };

  const handleCloseModal = () => {
    setModalImage(null);
  };

  const handleHeartReact = async (post) => {
    const postRef = doc(db, "community", post.id);
    const likeQuery = query(
      collection(db, "likes"),
      where("postId", "==", post.id),
      where("userId", "==", userId)
    );
    const likeSnapshot = await getDocs(likeQuery);

    if (likeSnapshot.empty) {
      await updateDoc(postRef, { heart: increment(1) });
      await addDoc(collection(db, "likes"), {
        postId: post.id,
        userId: userId,
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
    <>
      {posts.map((post) => (
        <div
          key={post.id}
          className="w-full h-[800px] md:h-auto shadow-md flex flex-col gap-2 rounded-md p-4 bg-white"
        >
          <div className="w-full flex flex-row gap-2">
            <img className="w-12 h-12 rounded-full" src={post.userProfile} />
            <div className="flex flex-col gap-1">
              <Link
                href={`/profile/${post.userId}`}
                className="text-sm font-semibold hover:underline"
              >
                {post.username}
              </Link>
              <label className="text-xs text-gray-400">
                {formatDate(post.time)}
              </label>
            </div>
          </div>
          <div className="w-full h-20">
            <label className="font-normal">{post.caption}</label>
          </div>
          <div className="w-full h-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {post.imageUrls.map((url, index) => (
              <div
                key={index}
                className="w-full h-20 md:h-full bg-gray-200 rounded-md overflow-hidden"
              >
                <img
                  src={url}
                  alt={`Post Image ${index + 1}`}
                  className="object-cover w-full h-full cursor-pointer"
                  onClick={() => handleImageClick(url)}
                />
              </div>
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
              <img className="" src="/Icons/CommentIcon.svg" />
              <label className="cursor-pointer">
                {post.commentCount}{" "}
                {post.commentCount > 1 ? "Comments" : "Comment"}
              </label>
            </Link>
          </div>
        </div>
      ))}
      <ImageModal
        src={modalImage}
        alt="Enlarged Image"
        onClose={handleCloseModal}
      />
    </>
  );
}

export default Posts;
