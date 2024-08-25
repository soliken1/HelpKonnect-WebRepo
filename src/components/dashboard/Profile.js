"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getCookie } from "cookies-next";
import { useState, useEffect } from "react";

function Profile() {
  const [user, setUser] = useState("");

  useEffect(() => {
    setUser(getCookie("user"));
  }, []);
  return (
    <Link
      href="/profile"
      className="absolute flex flex-row justify-center gap-2 end-10 top-10 bg-red-300 rounded-3xl shadow-md shadow-gray-200 px-4 py-2"
    >
      <Image
        className="rounded-full"
        src="/SampleProfile.jpg"
        width={30}
        height={30}
      />
      <label className="text-white font-semibold cursor-pointer">{user}</label>
    </Link>
  );
}

export default Profile;
