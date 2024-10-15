import React from "react";
import Card from "./Card";
import EventLoader from "../loaders/Events/EventLoader";

function CardContainer({ events }) {
  return (
    <div className="flex w-2/3 rounded-md max-h-[550px] overflow-y-auto flex-row flex-wrap gap-5 px-4 md:gap-10 mt-5">
      {events === null ? (
        <EventLoader />
      ) : events?.length > 0 ? (
        events.map((event, index) => <Card key={index} event={event} />)
      ) : (
        <label className="flex w-full h-full justify-center items-center text-lg font-semibold text-gray-400">
          No events found
        </label>
      )}
    </div>
  );
}

export default CardContainer;
