import React from "react";
import Image from "next/image";

function Card() {
  return (
    <div className="flex flex-col w-80 h-80 shadow-md rounded-lg gap-3">
      <div className="h-40 w-full">
        <Image
          className="w-full"
          width={1920}
          height={1080}
          src="/SampleImage.png"
          alt="Sample Image Event"
        />
      </div>
      <div className="flex flex-col gap-2 p-5">
        <label className="font-semibold">Annual Care Seminar</label>
        <label className="font-light text-gray-400 h-20">
          An Event Annualy For Care Awareness
        </label>
      </div>
    </div>
  );
}

export default Card;
