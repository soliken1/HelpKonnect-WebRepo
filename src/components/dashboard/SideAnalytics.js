import React from "react";
import Image from "next/image";

function SideAnalytics() {
  return (
    <div className="w-1/4">
      <div className="h-24 flex pt-10 ps-16 pe-16 justify-end items-center gap-2">
        <Image
          className="rounded-full border-2 border-black"
          src="/SampleImage.jpg"
          width={30}
          height={30}
        />
        <label className="text-black">Sample Facility</label>
      </div>
    </div>
  );
}

export default SideAnalytics;
