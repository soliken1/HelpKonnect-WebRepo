import React from "react";
import Image from "next/image";
import Stars from "@/components/general/Stars";
function Comments() {
  return (
    <div className="w-full flex-1 mt-5">
      <div className="h-20 flex flex-row gap-2 border-b-2  p-2">
        <Image
          src="/SampleProfile.jpg"
          width={1920}
          height={1080}
          alt="Profile"
          className="rounded-full w-10 h-10"
        />
        <div className="container">
          <label className="text-sm font-semibold">Sample User</label>
          <Stars className={"mt-0"} width={12} height={12} />
          <label className="text-xs font-light text-gray-600">Lol</label>
        </div>
      </div>
    </div>
  );
}

export default Comments;
