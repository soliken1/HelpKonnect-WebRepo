"use client";
import React from "react";

function UserListLoading() {
  return (
    <div className="w-full flex flex-col p-10 animate-pulse">
      <div className="flex flex-col md:w-4/12 md:h-full p-4 rounded-lg shadow-md">
        <div className="text-black font-bold text-xl">Chats</div>
        <div className="w-full h-10 rounded-full mt-3 bg-red-300"></div>
        <div className="w-full h-full flex flex-col mt-4">
          <div className="flex flex-row gap-2 h-16 items-center px-4 rounded-md">
            <div className="rounded-full w-12 h-12 bg-red-300"></div>
            <div className="flex flex-col justify-center gap-1">
              <div className="w-32 rounded-full h-4 bg-red-300"></div>
              <div className="w-52 rounded-full h-4 bg-red-300"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserListLoading;
