import React from "react";

function CallCard({ callUrl }) {
  return (
    <div className="absolute right-5 bottom-5 z-50">
      <div className="p-4 flex bg-red-300">
        <label className="text-black text-wrap">{`https://getstream.io/video/demos/join/${callUrl}?id=${callUrl}`}</label>
      </div>
    </div>
  );
}

export default CallCard;
