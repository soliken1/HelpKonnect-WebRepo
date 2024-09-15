import React, { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import PostForm from "./PostForm";
import PostContainer from "./PostContainer";

function Body() {
  const [userProfile, setUserProfile] = useState("");

  useEffect(() => {
    setUserProfile(getCookie("userProfile"));
  }, []);

  return (
    <div className="w-full h-full flex flex-col p-10">
      <div className="w-full h-full flex gap-5 flex-col md:flex-row mt-5">
        <PostForm userProfile={userProfile} />
        <PostContainer />
      </div>
    </div>
  );
}

export default Body;
