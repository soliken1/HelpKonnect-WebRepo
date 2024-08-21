import React from "react";
import Image from "next/image";
import Link from "next/link";

function Sidebar({ role }) {
  return (
    <div className="h-screen w-32 flex flex-col gap-5 bg-red-300 shadow-md shadow-red-400">
      <div className="w-full h-32 flex items-center justify-center">
        <Image src="/Logo/Logo.png" width={100} height={100} alt="Logo" />
      </div>
      <div className="w-full h-4/6 flex flex-col gap-5">
        {role === "admin" ? (
          <>
            <Link
              href="/dashboard"
              className="w-full flex items-center justify-center h-16"
            >
              <div className="flex flex-col items-center justify-center gap-1 p-2 transition duration-150 hover:bg-red-400 rounded-md">
                <Image
                  src="/Icons/AnalyticsIcon.png"
                  width={25}
                  height={25}
                  alt="Analytics Icon"
                />
                <label className="text-white text-sm font-bold cursor-pointer">
                  Analytics
                </label>
              </div>
            </Link>
            <Link
              href="/facilities"
              className="w-full flex items-center justify-center h-16"
            >
              <div className="flex flex-col items-center justify-center gap-1 p-2 transition duration-150 hover:bg-red-400 rounded-md">
                <Image
                  src="/Icons/ListIcon.png"
                  width={25}
                  height={25}
                  alt="Facilities Icon"
                />
                <label className="text-white text-sm font-bold cursor-pointer">
                  Facilities
                </label>
              </div>
            </Link>
            <Link
              href="/moderation"
              className="w-full flex items-center justify-center h-16"
            >
              <div className="flex flex-col items-center justify-center gap-1 p-2 transition duration-150 hover:bg-red-400 rounded-md">
                <Image
                  src="/Icons/CheckIcon.png"
                  width={25}
                  height={25}
                  alt="Moderation Icon"
                />
                <label className="text-white text-sm font-bold cursor-pointer">
                  Moderation
                </label>
              </div>
            </Link>
          </>
        ) : role === "facility" ? (
          <>
            <Link
              href="/dashboard"
              className="w-full flex items-center justify-center h-16"
            >
              <div className="flex flex-col items-center justify-center gap-1 p-2 transition duration-150 hover:bg-red-400 rounded-md">
                <Image
                  src="/Icons/AnalyticsIcon.png"
                  width={25}
                  height={25}
                  alt="Analytics Icon"
                />
                <label className="text-white text-sm font-bold cursor-pointer">
                  Analytics
                </label>
              </div>
            </Link>
            <Link
              href="/professionals"
              className="w-full flex items-center justify-center h-16"
            >
              <div className="flex flex-col items-center justify-center gap-1 p-2 transition duration-150 hover:bg-red-400 rounded-md">
                <Image
                  src="/Icons/ProfessionalIcon.png"
                  width={28}
                  height={28}
                  alt="Professionals Icon"
                />
                <label className="text-white text-sm font-bold cursor-pointer">
                  Professionals
                </label>
              </div>
            </Link>
            <Link
              href="/bookings"
              className="w-full flex items-center justify-center h-16"
            >
              <div className="flex flex-col items-center justify-center gap-1 p-2 transition duration-150 hover:bg-red-400 rounded-md">
                <Image
                  src="/Icons/ReservationIcon.png"
                  width={25}
                  height={25}
                  alt="Reservation Icon"
                />
                <label className="text-white text-sm font-bold cursor-pointer">
                  Reservation
                </label>
              </div>
            </Link>
            <Link
              href="/resources"
              className="w-full flex items-center justify-center h-16"
            >
              <div className="flex flex-col items-center justify-center gap-1 p-2 transition duration-150 hover:bg-red-400 rounded-md">
                <Image
                  src="/Icons/BoxIcon.png"
                  width={25}
                  height={25}
                  alt="Resources Icon"
                />
                <label className="text-white text-sm font-bold cursor-pointer">
                  Resources
                </label>
              </div>
            </Link>
            <Link
              href="/dashboard"
              className="w-full flex items-center justify-center h-16"
            >
              <div className="flex flex-col items-center justify-center gap-1 p-2 transition duration-150 hover:bg-red-400 rounded-md">
                <Image
                  src="/Icons/EventsIcon.png"
                  width={25}
                  height={25}
                  alt="Analytics Icon"
                />
                <label className="text-white text-sm font-bold cursor-pointer">
                  Events
                </label>
              </div>
            </Link>
          </>
        ) : null}
      </div>
      <Link href="/" className="w-full flex items-center justify-center h-16">
        <div className="flex flex-col items-center justify-center gap-1 p-2 transition duration-150 hover:bg-red-400 rounded-md">
          <Image
            src="/Icons/ExitIcon.png"
            width={20}
            height={20}
            alt="Logout Icon"
          />
          <label className="text-white text-sm font-bold cursor-pointer">
            Logout
          </label>
        </div>
      </Link>
    </div>
  );
}

export default Sidebar;
