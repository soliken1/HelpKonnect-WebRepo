"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/configs/firebaseConfigs";
import formatDate from "@/utils/formatDate";

function SelectedPost() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Track current image index

  useEffect(() => {
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

  // Function to handle next image
  const handleNextImage = () => {
    if (post && post.imageUrls) {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % post.imageUrls.length
      );
    }
  };

  // Function to handle previous image
  const handlePreviousImage = () => {
    if (post && post.imageUrls) {
      setCurrentImageIndex(
        (prevIndex) =>
          (prevIndex - 1 + post.imageUrls.length) % post.imageUrls.length
      );
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="w-full h-full flex flex-col md:flex-row items-center px-10 py-2 gap-4">
      <div className="w-full md:w-2/3 h-5/6 shadow-lg rounded-md bg-white flex flex-col">
        {/* User Info */}
        <div className="p-4">
          <div className="flex flex-row gap-2">
            <img
              src={post.userProfile}
              alt="User Profile"
              className="w-12 h-12 rounded-full"
            />
            <div className="flex flex-col justify-center">
              <label className="text-sm font-semibold">{post.username}</label>
              <label className="text-xs text-gray-400">
                {formatDate(post.time)}
              </label>
            </div>
          </div>

          {/* Post Caption */}
          <label className="font-normal text-sm">{post.caption}</label>
        </div>

        {/* Image Section with Slider */}
        <div className="relative w-full flex-grow flex justify-center min-h-[600px] z-10">
          {post.imageUrls && post.imageUrls.length > 0 && (
            <img
              src={post.imageUrls[currentImageIndex]}
              alt="Post"
              className="object-cover w-full h-5/6"
            />
          )}

          <div className="mt-5">
            <button
              onClick={handlePreviousImage}
              className="absolute left-4 bg-gray-700 text-white rounded-full w-8 h-8 hover:bg-gray-600"
            >
              &#8592;
            </button>

            <button
              onClick={handleNextImage}
              className="absolute right-4 bg-gray-700 text-white rounded-full w-8 h-8 hover:bg-gray-600"
            >
              &#8594;
            </button>
          </div>
        </div>
      </div>

      {/* Right-hand Side */}
      <div className="w-full md:w-1/3 h-5/6 flex flex-col shadow-lg rounded-md bg-white p-4">
        <div className="">
          <label>Comments</label>
        </div>
      </div>
    </div>
  );
}

export default SelectedPost;
