import React from "react";
import Profile from "./Profile";
import Message from "./Message";

function Ribbon() {
  return (
    <div className="absolute flex flex-row justify-center gap-5 end-2 top-1 md:end-10 md:top-10">
      <Message />
      <Profile />
    </div>
  );
}

export default Ribbon;
