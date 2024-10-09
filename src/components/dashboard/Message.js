import React from "react";
import Link from "next/link";

function Message() {
  return (
    <div className="h-12 flex justify-center items-center w-auto">
      <Link
        href="/message"
        className="p-3 bg-red-300 hover:bg-red-400 rounded-full shadow-md duration-100"
      >
        <svg
          width="21"
          height="21"
          viewBox="0 0 21 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.9717 13.0105C19.9717 13.5409 19.761 14.0496 19.3859 14.4247C19.0108 14.7998 18.5021 15.0105 17.9717 15.0105H5.97168L1.97168 19.0105V3.0105C1.97168 2.48007 2.18239 1.97136 2.55747 1.59628C2.93254 1.22121 3.44125 1.0105 3.97168 1.0105H17.9717C18.5021 1.0105 19.0108 1.22121 19.3859 1.59628C19.761 1.97136 19.9717 2.48007 19.9717 3.0105V13.0105Z"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </div>
  );
}

export default Message;
