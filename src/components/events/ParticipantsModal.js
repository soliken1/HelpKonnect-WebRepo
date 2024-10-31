import React, { useEffect, useState } from "react";
import Image from "next/image";
const ParticipantsModal = ({
  isOpen,
  onRequestClose,
  participants,
  userInfo,
}) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShowModal(true), 50);
    } else {
      setShowModal(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div
        className={`bg-white p-10 rounded-lg shadow-md relative h-full md:h-1/2 md:w-2/3 transition-transform duration-200 ease-in-out ${
          showModal ? "scale-100" : "scale-0"
        }`}
      >
        <button
          className="absolute top-6 right-6 text-gray-500 text-3xl hover:text-gray-700"
          onClick={onRequestClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">Participants</h2>
        <div className="max-h-60 overflow-y-auto flex flex-col gap-2">
          {userInfo.length > 0 ? (
            userInfo.map((user, index) => (
              <div key={index} className="items-center flex flex-row">
                <Image
                  className="w-8 h-8 rounded-full"
                  width={1920}
                  height={1080}
                  src={user.imageUrl}
                  alt={`${user.firstName} ${user.lastName}`}
                />
                <div>
                  <h3 className="font-semibold">
                    {user.firstName} {user.lastName}
                  </h3>
                  <p className="text-gray-600">@{user.username}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No participants found for this event.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParticipantsModal;
