import React from "react";

function FacilityAnalytics() {
  return (
    <div className="w-1/3 flex flex-col gap-5 mt-5">
      <div className="w-full h-32 bg-gradient-to-br items-start from-red-300 rounded-md flex flex-col to-pink-400 p-4 group shadow-md">
        <label className="text-white text-lg group-hover:scale-105 transition-transform duration-300">
          Total Facility Partnered:
        </label>
        <label className="text-white text-6xl font-semibold group-hover:scale-105 transition-transform duration-300">
          100
        </label>
      </div>
      <div className="w-full h-32 bg-gradient-to-br items-start from-red-300 rounded-md flex flex-col to-pink-400 p-4 group shadow-md">
        <label className="text-white text-lg group-hover:scale-105 transition-transform duration-300">
          Total Generated Revenue:
        </label>
        <label className="text-white text-6xl font-semibold group-hover:scale-105 transition-transform duration-300">
          ₱100
        </label>
      </div>
    </div>
  );
}

export default FacilityAnalytics;
