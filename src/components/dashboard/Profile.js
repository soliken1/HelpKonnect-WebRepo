"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getCookie } from "cookies-next";
import { useState, useEffect } from "react";

function Profile() {
  const [user, setUser] = useState("");
  const [userProfile, setUserProfile] = useState("");

  useEffect(() => {
    setUser(getCookie("user"));
    setUserProfile(getCookie("userProfile"));
  }, []);

  return (
    <Link
      href="/profile"
      className="z-40 bg-red-300 w-auto md:min-w-48 flex flex-row gap-2 justify-center items-center h-12 rounded-3xl shadow-md shadow-gray-200 px-4 py-2"
    >
      {userProfile === "" ? (
        <div className="animate-pulse flex flex-row gap-3 justify-center items-center">
          <div className="rounded-full w-8 h-8 bg-red-400 animate-pulse"></div>
          <div className="bg-red-400 w-24 h-4 md:block hidden rounded-full animate-pulse"></div>
        </div>
      ) : (
        <>
          <img
            className="rounded-full"
            src={userProfile}
            width={30}
            height={30}
            alt="Profile"
          />
          <label className="text-white font-semibold cursor-pointer md:block hidden">
            {user}
          </label>
        </>
      )}
    </Link>
  );
}

export default Profile;
