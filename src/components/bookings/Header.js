import React from "react";

function Header({ user }) {
  return (
    <div className="flex flex-col">
      <label className="text-lg font-bold">Bookings</label>
      <label className="font-medium text-gray-400">
        User Bookings on {user}
      </label>
    </div>
  );
}

export default Header;
