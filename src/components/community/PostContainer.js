"use client";
import React, { useState, useEffect } from "react";
import Posts from "./Posts";
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import { db } from "@/configs/firebaseConfigs";

function PostContainer({ userId }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
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
      } catch (error) {
        console.error("Error fetching community posts or comments:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="w-full md:w-2/3 h-full flex flex-col gap-5 px-3 py-6 items-center rounded-lg overflow-auto">
      <Posts userId={userId} posts={posts} />
    </div>
  );
}

export default PostContainer;
