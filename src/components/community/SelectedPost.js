"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  doc,
  getDoc,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/configs/firebaseConfigs";
import formatDate from "@/utils/formatDate";
import Comments from "./Comments";
import { getCookie } from "cookies-next";
import PostLoader from "../loaders/Community/PostLoader";
import { handleModerationTest } from "@/configs/textFiltering";
import { toast, Bounce } from "react-toastify";
import { ToastContainer } from "react-toastify";
import PostSubmitting from "../loaders/Community/PostSubmitting";
import Image from "next/image";

function SelectedPost() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [postComment, setPostComment] = useState("");
  const [userId, setUserId] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  useEffect(() => {
    setUserId(getCookie("userId"));
    const fetchPost = async () => {
      try {
        const docRef = doc(db, "community", postId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPost(docSnap.data());
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error getting document:", error);
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId]);

  const handleNextImage = () => {
    if (post && post.imageUrls) {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % post.imageUrls.length
      );
    }
  };

  const handlePreviousImage = () => {
    if (post && post.imageUrls) {
      setCurrentImageIndex(
        (prevIndex) =>
          (prevIndex - 1 + post.imageUrls.length) % post.imageUrls.length
      );
    }
  };

  const handleComments = async (e) => {
    setIsPosting(true);
    e.preventDefault();
    if (postComment.trim() === "") return;
    const result = await handleModerationTest(postComment.trim());
    if (result.result.includes("*")) {
      toast.error(
        "Profanities are strictly prohibited on the Community, Please Refrain from doing so. You have been marked for moderation.",
        {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        }
      );
      try {
        await addDoc(collection(db, "flaggedAccounts"), {
          time: serverTimestamp(),
          userId: userId,
          comment: postComment,
        });
      } catch (e) {
        console.error(e);
      }
      setPostComment("");
      setIsPosting(false);
      return;
    }

    try {
      await addDoc(collection(db, "comments"), {
        time: serverTimestamp(),
        postId,
        userId: userId,
        comment: postComment,
      });
      setPostComment("");
      window.location.reload();
    } catch (e) {
      console.error("Error adding document:", e);
    }
  };

  if (loading) {
    return <PostLoader />;
  }

  if (!post) {
    return <PostLoader />;
  }

  return (
    <div className="w-full h-full flex flex-col md:flex-row items-center px-10 py-2 gap-4 z-0">
      <div className="w-full md:w-2/3 h-5/6 shadow-lg rounded-md bg-white flex flex-col">
        <div className="p-4">
          <div className="flex flex-row gap-2">
            <Image
              src={post.userProfile}
              alt="User Profile"
              className="w-12 h-12 object-cover rounded-full"
              width={1920}
              height={1080}
            />
            <div className="flex flex-col justify-center">
              <label className="text-sm font-semibold">{post.username}</label>
              <label className="text-xs text-gray-400">
                {formatDate(post.time)}
              </label>
            </div>
          </div>
          <label className="font-normal text-sm">{post.caption}</label>
        </div>

        <div className="relative w-full flex-1">
          <button
            onClick={handlePreviousImage}
            className="absolute left-4 top-1 bg-gray-700 text-white rounded-full w-8 h-8 hover:bg-gray-600"
          >
            &#8592;
          </button>

          <button
            onClick={handleNextImage}
            className="absolute right-4 top-1 bg-gray-700 text-white rounded-full w-8 h-8 hover:bg-gray-600"
          >
            &#8594;
          </button>
          {post.imageUrls && post.imageUrls.length > 0 && (
            <Image
              src={post.imageUrls[currentImageIndex]}
              alt="Post"
              className="object-cover w-full max-h-[500px] rounded-b-md z-10"
              width={1920}
              height={1080}
            />
          )}
        </div>
      </div>

      <div className="w-full md:w-1/3 h-5/6 flex flex-col shadow-lg rounded-md bg-white p-4">
        <div className="h-5/6 w-full">
          <label>Comments</label>
          <div className="flex flex-col mt-5 gap-2">
            <Comments postId={postId} />
          </div>
        </div>
        <form onSubmit={handleComments}>
          <textarea
            value={postComment}
            onChange={(e) => setPostComment(e.target.value)}
            className="w-full p-2 mt-5 resize-none bg-gray-100 rounded-md text-sm"
            placeholder="Write a comment..."
          ></textarea>
          <button
            type="submit"
            className="w-full bg-red-400 text-white rounded-md py-2"
          >
            Comment
          </button>
        </form>
        <ToastContainer />
      </div>
      {isPosting && <PostSubmitting />}
    </div>
  );
}

export default SelectedPost;
