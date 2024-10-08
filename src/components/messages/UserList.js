"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

function List({ users, currentUser }) {
  return (
    <div className="w-full flex flex-col p-10">
      <div className="flex flex-col md:w-4/12 md:h-full p-4 rounded-lg shadow-md">
        <label className="text-black font-bold text-xl">Chats</label>
        <input
          type="text"
          className="w-full py-2 px-4 rounded-full placeholder:text-sm mt-4 text-sm shadow-md"
          placeholder="Search..."
        />
        <div className="w-full h-full flex flex-col py-4 overflow-auto">
          {users
            .filter((user) => user.id !== currentUser)
            .map((user) => (
              <Link
                href={`/message/${user.id}`}
                key={user.id}
                className="flex flex-row gap-2 h-16 items-center cursor-pointer hover:bg-gray-300 px-4 duration-100 rounded-md"
              >
                <Image
                  src={user.imageUrl ? user.imageUrl : "/UserIcon.svg"}
                  width={1920}
                  height={1080}
                  className="rounded-full w-12 h-12"
                  alt={`${user.facilityName || user.username}'s profile`}
                />
                <div className="flex flex-col justify-center">
                  <label className="text-sm font-semibold cursor-pointer">
                    {user.facilityName || user.username}
                  </label>
                  <label className="text-gray-400 text-xs cursor-pointer">
                    Render Recent Message Here
                  </label>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

export default List;
