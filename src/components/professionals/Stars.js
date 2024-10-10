import React from "react";
import Image from "next/image";

function Stars({ width, height, className }) {
  return (
    <div className={`flex flex-row gap-2 ${className}`}>
      <Image src="/Icons/Star.png" width={width} height={height} alt="Star" />
      <Image src="/Icons/Star.png" width={width} height={height} alt="Star" />
      <Image src="/Icons/Star.png" width={width} height={height} alt="Star" />
      <Image src="/Icons/Star.png" width={width} height={height} alt="Star" />
      <Image src="/Icons/Star.png" width={width} height={height} alt="Star" />
    </div>
  );
}

export default Stars;
