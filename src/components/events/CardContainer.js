import React from "react";
import Card from "./Card";

function CardContainer() {
  return (
    <div className="flex justify-evenly gap-3 mt-5">
      <Card />
      <Card />
      <Card />
    </div>
  );
}

export default CardContainer;
