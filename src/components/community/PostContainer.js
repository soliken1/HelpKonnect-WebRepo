"use client";
import React, { useState, useEffect } from "react";
import Posts from "./Posts";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/configs/firebaseConfigs";
function PostContainer() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "community"));
        const postData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Post Data", postData);
        setPosts(postData);
      } catch (error) {
        console.error("Error fetching community post:", error);
      }
    };
    fetchPosts();
  }, []);
  return (
    <div className="w-full md:w-2/3 h-full flex flex-col gap-2 px-3 py-6 items-center rounded-lg overflow-auto">
      <Posts posts={posts} />
    </div>
  );
}

export default PostContainer;
