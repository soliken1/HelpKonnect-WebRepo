import React from "react";
import Card from "./Card";

function CardContainer({ events }) {
  return (
    <div className="flex w-2/3 rounded-md max-h-[550px] overflow-y-auto flex-row flex-wrap gap-5 px-4 md:gap-10 mt-5">
      {events.map((event, index) => (
        <Card key={index} event={event} />
      ))}
    </div>
  );
}

export default CardContainer;
