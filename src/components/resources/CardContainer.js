import React from "react";
import Card from "./Card";

function CardContainer() {
  return (
    <div className="flex flex-col items-center md:flex-row md:items-start md:justify-evenly md:gap-3 mt-5 gap-5">
      <Card />
      <Card />
      <Card />
    </div>
  );
}

export default CardContainer;
