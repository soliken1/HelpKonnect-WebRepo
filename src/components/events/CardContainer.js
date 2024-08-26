import React from "react";
import Card from "./Card";

function CardContainer() {
  return (
    <div className="flex flex-col items-center md:flex-row md:items-start md:justify-evenly gap-5 md:gap-3 mt-5">
      <Card />
      <Card />
      <Card />
    </div>
  );
}

export default CardContainer;
