import formatDate from "@/utils/formatDate";
import Link from "next/link";
import React from "react";
import Image from "next/image";

function UserProfile({ user, currentUser }) {
  return (
    <div className="w-full h-full md:w-1/3 flex flex-col gap-4 px-6 py-8 shadow-lg rounded-lg bg-white">
      <div className="bg-gradient-to-r from-red-200 to-red-400 w-full h-48 rounded-t-lg relative flex items-end justify-center">
        <Image
          src={user.imageUrl || ""}
          className="w-28 h-28 rounded-full absolute -bottom-12 border-4 border-white shadow-lg"
          alt={user.facilityName || user.username || ""}
          width={1920}
          height={1080}
        />
      </div>

      <div className="mt-14 flex flex-col items-center text-center">
        <label className="font-bold text-2xl text-gray-800">
          {user.facilityName || user.username}
        </label>
        <label className="text-sm text-gray-500">
          {user.facilityDescription}
        </label>
        <label className="text-sm text-gray-500">{user.facilityContacts}</label>
        <label className="text-sm text-gray-500">{user.facilityLocation}</label>
        <label className="text-xs text-gray-400 mt-2">
          Joined {formatDate(user.dateCreated)}
        </label>
      </div>

      <div className="flex justify-center mt-4">
        {String(user.userId) === String(currentUser) ? (
          ""
        ) : (
          <Link
            href={`/message/${user.userId}`}
            className="bg-red-500 text-white py-2 px-6 rounded-full hover:bg-red-600 transition"
          >
            Message
          </Link>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
