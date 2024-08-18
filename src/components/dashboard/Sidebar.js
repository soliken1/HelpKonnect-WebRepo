import React from "react";
import Image from "next/image";
import Link from "next/link";

function Sidebar() {
  return (
    <div className="h-screen w-36 flex flex-col gap-5 bg-red-300">
      <div className="w-full h-32 flex items-center justify-center">
        <Image src="/Logo/Logo.png" width={100} height={100} />
      </div>
      <div className="w-full h-4/6 flex flex-col gap-5">
        <Link
          href="/dashboard"
          className="w-full h-16 flex flex-col justify-center items-center gap-1"
        >
          <Image src="/Icons/AnalyticsIcon.png" width={25} height={25} />
          <label className="text-white text-sm font-bold cursor-pointer">
            Analytics
          </label>
        </Link>
        <Link
          href="/dashboard"
          className="w-full h-16 flex flex-col justify-center items-center gap-1"
        >
          <Image src="/Icons/CheckIcon.png" width={25} height={25} />
          <label className="text-white text-sm font-bold cursor-pointer">
            Moderation
          </label>
        </Link>
        <Link
          href="/dashboard"
          className="w-full h-16 flex flex-col justify-center items-center gap-1"
        >
          <Image src="/Icons/ListIcon.png" width={25} height={25} />
          <label className="text-white text-sm font-bold cursor-pointer">
            Facilities
          </label>
        </Link>
      </div>
      <Link
        href="/"
        className="w-full h-16 flex flex-col justify-center items-center gap-1"
      >
        <Image src="/Icons/ExitIcon.png" width={20} height={20} />
        <label className="text-white text-sm font-bold cursor-pointer">
          Logout
        </label>
      </Link>
    </div>
  );
}

export default Sidebar;
