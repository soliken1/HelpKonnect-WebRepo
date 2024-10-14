"use client";
import React from "react";
import { useEffect, useState } from "react";

function AddFacilityModal({ isOpen, onClose, children }) {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={`bg-white px-6 md:px-10 pt-8 pb-2 rounded-lg shadow-md relative w-full h-full md:w-5/6 md:h-5/6 transition-transform duration-200 ease-in-out ${
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

export default AddFacilityModal;
