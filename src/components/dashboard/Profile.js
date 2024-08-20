import React from "react";
import Image from "next/image";

function Profile() {
  return (
    <div className="absolute flex flex-row justify-center gap-2 end-10 top-10">
      <Image
        className="rounded-full border-2 border-black"
        src="/SampleImage.jpg"
        width={30}
        height={30}
      />
      <label className="text-black">Sample Facility</label>
    </div>
  );
}

export default Profile;
