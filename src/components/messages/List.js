import React from "react";

function List({ users, onSelectUser }) {
  return (
    <div className="flex flex-col w-3/12 h-full p-4 rounded-lg shadow-md">
      <label className="text-black font-bold text-xl">Chats</label>
      <input
        type="text"
        className="w-full py-2 px-4 rounded-full placeholder:text-sm mt-4 text-sm drop-shadow-md shadow-black"
        placeholder="Search..."
      />
      <div className="w-full h-full flex flex-col gap-3 mt-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex flex-row gap-2 h-12 cursor-pointer"
            onClick={() => onSelectUser(user)}
          >
            <img
              src={"/SampleProfile.jpg"}
              className="rounded-full w-12 h-12"
              alt={`${user.facilityName}'s profile`}
            />
            <div className="flex flex-col justify-center">
              <label className="text-sm font-semibold">
                {user.facilityName}
              </label>
              <label className="text-gray-400 text-xs">
                Render Recent Message Here
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default List;
