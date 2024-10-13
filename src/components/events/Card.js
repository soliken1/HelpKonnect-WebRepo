import React from "react";
import Image from "next/image";

function Card() {
  return (
    <div className="flex flex-col w-full h-40 shadow-md rounded-lg gap-3 relative group hover:h-[450px] transition-all duration-300 overflow-hidden">
      <div className="h-full w-full bg-black rounded-md absolute">
        <Image
          className="w-full h-full object-cover opacity-50"
          width={1920}
          height={1080}
          src="/SampleProfile.jpg"
          alt="Sample Image Event"
        />
      </div>
      <div className="flex flex-row gap-1 absolute bottom-4 right-4 justify-center items-end">
        <label className="text-6xl text-gray-300 font-semibold ">30</label>
        <label className="text-white">Participations</label>
      </div>
      <label className="text-lg text-gray-300 font-semibold absolute group-hover:opacity-100 transition-opacity duration-300 opacity-0 top-4 left-4">
        Somewhere In Banilad
      </label>
      <label className="text-lg text-gray-300 font-semibold absolute top-12 group-hover:opacity-100 transition-opacity duration-300 opacity-0 left-4">
        1/1/2024
      </label>
      <label className="text-lg text-gray-300 font-semibold absolute top-20 group-hover:opacity-100 transition-opacity duration-300 opacity-0 left-4">
        10:30 AM - 11:30 AM
      </label>
      <label className="text-xl text-gray-300 font-semibold absolute bottom-12 left-4">
        Sample Details of the Event
      </label>
      <label className="text-3xl text-white font-semibold absolute bottom-4 left-4">
        Annual Self-Care Seminar
      </label>
    </div>
  );
}

export default Card;
