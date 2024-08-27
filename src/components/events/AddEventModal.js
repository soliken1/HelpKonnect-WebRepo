import React, { useEffect, useState } from "react";

export default function Modal({ isOpen, onClose, children }) {
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
        className={`bg-white p-10 rounded-lg shadow-md shadow-red-200 relative h-full md:w-2/3 md:h-3/4 transition-transform duration-200 ease-in-out ${
          showModal ? "scale-100" : "scale-0"
        }`}
      >
        <button
          className="absolute top-6 right-6 text-gray-500 text-3xl hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
