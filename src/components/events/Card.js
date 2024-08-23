import React from "react";

function Card() {
  return (
    <div className="flex flex-col w-80 h-80 shadow-md shadow-red-200 rounded-lg gap-3">
      <div className="h-40 w-full">
        <img className="w-full" src="/SampleImage.png" />
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
