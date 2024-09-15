"use client";
import React, { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import PostForm from "./PostForm";
import PostContainer from "./PostContainer";

function Body() {
  const [userProfile, setUserProfile] = useState("");
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    setUserProfile(getCookie("userProfile"));
    setUserId(getCookie("userId"));
    setUserName(getCookie("user"));
  }, []);

  return (
    <div className="w-full h-full flex flex-col p-10">
      <div className="w-full h-full flex gap-5 flex-col md:flex-row mt-5">
        <PostForm
          userProfile={userProfile}
          userId={userId}
          username={userName}
        />
        <PostContainer userId={userId} />
      </div>
    </div>
  );
}

export default Body;
