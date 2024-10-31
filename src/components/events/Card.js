import React from "react";
import Image from "next/image";

function Card({ event, onClick }) {
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const formatTime = (time) => {
    const [hour, minute] = time.split(":");
    const date = new Date();
    date.setHours(hour, minute);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  const formattedTimeStart = formatTime(event.timeStart);
  const formattedTimeEnd = formatTime(event.timeEnd);

  return (
    <div
      className="flex flex-col cursor-pointer w-full h-40 shadow-md rounded-lg gap-3 relative group hover:h-[450px] transition-all duration-300 overflow-hidden"
      onClick={onClick}
    >
      <div className="h-full w-full bg-black rounded-md absolute">
        <Image
          className="w-full h-full object-cover opacity-50"
          width={1920}
          height={1080}
          src={event.imageUrl}
          alt={event.name}
        />
      </div>
      <div className="flex flex-row gap-1 absolute bottom-4 right-4 justify-center items-end">
        <label className="text-6xl text-gray-300 font-semibold ">
          {event.countParticipants}
        </label>
        <label className="text-white">Participations</label>
      </div>
      <label className="text-lg text-gray-300 font-semibold absolute group-hover:opacity-100 transition-opacity duration-300 opacity-0 top-4 left-4">
        {event.venue}
      </label>
      <label className="text-lg text-gray-300 font-semibold absolute top-12 group-hover:opacity-100 transition-opacity duration-300 opacity-0 left-4">
        {formattedDate}
      </label>
      <label className="text-lg text-gray-300 font-semibold absolute top-20 group-hover:opacity-100 transition-opacity duration-300 opacity-0 left-4">
        {formattedTimeStart} - {formattedTimeEnd}
      </label>
      <label className="text-xl text-gray-300 font-semibold absolute bottom-12 left-4">
        {event.description}
      </label>
      <label className="text-3xl text-white font-semibold absolute bottom-4 left-4">
        {event.name}
      </label>
    </div>
  );
}

export default Card;
