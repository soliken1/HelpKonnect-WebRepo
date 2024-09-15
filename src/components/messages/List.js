"use client";
import React from "react";

function List({ users, onSelectUser, currentUser }) {
  return (
    <div className="flex flex-col md:w-3/12 md:h-full p-4 rounded-lg shadow-md">
      <label className="text-black font-bold text-xl">Chats</label>
      <input
        type="text"
        className="w-full py-2 px-4 rounded-full placeholder:text-sm mt-4 text-sm shadow-md"
        placeholder="Search..."
      />
      <div className="w-full h-full flex flex-col gap-3 mt-4">
        {users
          .filter((user) => user.id !== currentUser)
          .map((user) => (
            <div
              key={user.id}
              className="flex flex-row gap-2 h-12 cursor-pointer"
              onClick={() => onSelectUser(user)}
            >
              <img
                src={`${user.imageUrl}`}
                width={20}
                height={20}
                className="rounded-full w-12 h-12"
                alt={`${user.facilityName || user.username}'s profile`}
              />
              <div className="flex flex-col justify-center">
                <label className="text-sm font-semibold">
                  {user.facilityName || user.username}
                </label>
                <label className="text-gray-400 text-xs">
                  Render Recent Message Here
                </label>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default List;
