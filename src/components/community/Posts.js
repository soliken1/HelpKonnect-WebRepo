import React, { useState } from "react";
import formatDate from "@/utils/formatDate";
import ImageModal from "./ImageModal";
import Link from "next/link";

function Posts({ posts }) {
  const [modalImage, setModalImage] = useState(null);

  const handleImageClick = (url) => {
    setModalImage(url);
  };

  const handleCloseModal = () => {
    setModalImage(null);
  };

  return (
    <>
      {posts.map((post) => (
        <div
          key={post.id}
          className="w-full h-[800px] md:h-5/6 shadow-md flex flex-col gap-2 rounded-md p-4 bg-white"
        >
          <div className="w-full flex flex-row gap-2">
            <img className="w-12 h-12 rounded-full" src={post.userProfile} />
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold">{post.username}</label>
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
                className="w-full h-24 md:h-32 lg:h-40 bg-gray-200 rounded-md overflow-hidden"
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
            >
              <img className="" src="/Icons/HeartIcon.svg" />
              <label className="cursor-pointer">0</label>
            </button>
            <Link
              href={`/community/${post.id}`}
              type="button"
              className="w-1/2 h-full flex flex-row justify-center items-center gap-5 hover:bg-gray-200 rounded-sm duration-200"
            >
              <img className="" src="/Icons/CommentIcon.svg" />
              <label className="cursor-pointer"> 0 Comments</label>
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
