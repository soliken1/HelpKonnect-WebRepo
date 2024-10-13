"use client";
import React, { useState, useEffect } from "react";
import Posts from "./Posts";
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import { db } from "@/configs/firebaseConfigs";
import PostContainerLoader from "../loaders/Community/PostContainerLoader";

function PostContainer({ userId }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const postsQuery = query(
          collection(db, "community"),
          orderBy("time", "desc")
        );
        const querySnapshot = await getDocs(postsQuery);

        const postDataPromises = querySnapshot.docs.map(async (postDoc) => {
          const postData = { id: postDoc.id, ...postDoc.data() };

          const commentsQuery = query(
            collection(db, "comments"),
            where("postId", "==", postDoc.id)
          );
          const commentsSnapshot = await getDocs(commentsQuery);

          postData.commentCount = commentsSnapshot.size;

          return postData;
        });

        const postData = await Promise.all(postDataPromises);
        setPosts(postData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching community posts or comments:", error);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <PostContainerLoader />;
  }

  return (
    <div className="w-full md:w-2/3 h-full flex flex-col gap-5 px-3 py-6 rounded-lg overflow-auto">
      <div className="h-32 w-full flex-row flex gap-5">
        <input
          type="text"
          className="w-full h-10 shadow-md rounded-full py-2 px-6 placeholder:text-black"
          placeholder="Search"
        />
        <button
          type="button"
          className="w-auto px-6 py-2 h-10 bg-red-300 text-nowrap rounded-full text-white hover:bg-red-400 duration-300 shadow-md"
        >
          Most Recent
        </button>
      </div>
      <Posts userId={userId} posts={posts} />
    </div>
  );
}

export default PostContainer;
