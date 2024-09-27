"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { logSessionEnd } from "@/utils/sessions";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
function Sidebar({ role }) {
  const [isPressed, setPressed] = useState(true);
  const router = useRouter();

  const handleSelect = () => {
    setPressed(!isPressed);
  };

  const handleLogout = async () => {
    try {
      await logSessionEnd(getCookie("userId"));

      await fetch("/api/clearCookie", { method: "POST" });

      const cookies = document.cookie.split(";");
      cookies.forEach((cookie) => {
        const [name] = cookie.split("=");
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
      });

      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      <div
        className={`z-20 fixed top-6 left-6 flex flex-col gap-1
         cursor-pointer bg-red-300 rounded-full hover:opacity-100 opacity-100 duration-300  ${
           isPressed ? "opacity-100" : "opacity-50"
         }`}
        onClick={handleSelect}
      >
        <Image src="/Logo/Logo.png" width={75} height={75} alt="Logo" />
      </div>
      <div
        className={`h-screen z-10 fixed md:relative w-32 ${
          isPressed ? "inline" : "hidden"
        } flex flex-col gap-5 bg-red-300 shadow-md shadow-red-400`}
      >
        <div className="w-full h-32 flex items-center justify-center"></div>

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
                href="/facility"
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
              <div className="w-full flex items-center justify-center h-16">
                <Link
                  href="/community"
                  className="flex flex-col items-center justify-center gap-1 p-2 transition duration-150 hover:bg-red-400 rounded-md"
                >
                  <Image
                    src="/Icons/GlobeIcon.svg"
                    width={25}
                    height={25}
                    alt="Events Icon"
                  />
                  <label className="text-white text-sm font-bold cursor-pointer">
                    Community
                  </label>
                </Link>
              </div>
            </>
          ) : role === "facility" ? (
            <>
              <div className="w-full flex items-center justify-center h-16">
                <Link
                  href="/dashboard"
                  className="flex flex-col items-center justify-center gap-1 p-2 transition duration-150 hover:bg-red-400 rounded-md"
                >
                  <Image
                    src="/Icons/AnalyticsIcon.png"
                    width={25}
                    height={25}
                    alt="Analytics Icon"
                  />
                  <label className="text-white text-sm font-bold cursor-pointer">
                    Analytics
                  </label>
                </Link>
              </div>
              <div className="w-full flex items-center justify-center h-16">
                <Link
                  href="/professionals"
                  className="flex flex-col items-center justify-center gap-1 p-2 transition duration-150 hover:bg-red-400 rounded-md"
                >
                  <Image
                    src="/Icons/ProfessionalIcon.png"
                    width={28}
                    height={28}
                    alt="Professionals Icon"
                  />
                  <label className="text-white text-sm font-bold cursor-pointer">
                    Professionals
                  </label>
                </Link>
              </div>
              <div className="w-full flex items-center justify-center h-16">
                <Link
                  href="/bookings"
                  className="flex flex-col items-center justify-center gap-1 p-2 transition duration-150 hover:bg-red-400 rounded-md"
                >
                  <Image
                    src="/Icons/ReservationIcon.png"
                    width={25}
                    height={25}
                    alt="Reservation Icon"
                  />
                  <label className="text-white text-sm font-bold cursor-pointer">
                    Reservation
                  </label>
                </Link>
              </div>
              <div className="w-full flex items-center justify-center h-16">
                <Link
                  href="/resources"
                  className="flex flex-col items-center justify-center gap-1 p-2 transition duration-150 hover:bg-red-400 rounded-md"
                >
                  <Image
                    src="/Icons/BoxIcon.png"
                    width={25}
                    height={25}
                    alt="Resources Icon"
                  />
                  <label className="text-white text-sm font-bold cursor-pointer">
                    Resources
                  </label>
                </Link>
              </div>
              <div className="w-full flex items-center justify-center h-16">
                <Link
                  href="/events"
                  className="flex flex-col items-center justify-center gap-1 p-2 transition duration-150 hover:bg-red-400 rounded-md"
                >
                  <Image
                    src="/Icons/EventsIcon.png"
                    width={25}
                    height={25}
                    alt="Events Icon"
                  />
                  <label className="text-white text-sm font-bold cursor-pointer">
                    Events
                  </label>
                </Link>
              </div>
              <div className="w-full flex items-center justify-center h-16">
                <Link
                  href="/community"
                  className="flex flex-col items-center justify-center gap-1 p-2 transition duration-150 hover:bg-red-400 rounded-md"
                >
                  <Image
                    src="/Icons/GlobeIcon.svg"
                    width={25}
                    height={25}
                    alt="Events Icon"
                  />
                  <label className="text-white text-sm font-bold cursor-pointer">
                    Community
                  </label>
                </Link>
              </div>
            </>
          ) : null}
        </div>
        <div className="w-full flex items-center justify-center h-16">
          <div
            onClick={handleLogout}
            className="flex flex-col items-center justify-center gap-1 p-2 transition duration-150 hover:bg-red-400 rounded-md cursor-pointer"
          >
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
        </div>
      </div>
    </>
  );
}

export default Sidebar;
