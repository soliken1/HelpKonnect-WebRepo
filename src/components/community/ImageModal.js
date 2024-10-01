import React from "react";
import Image from "next/image";
function ImageModal({ src, alt, onClose }) {
  if (!src) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative rounded-lg">
        <button
          onClick={onClose}
          className="absolute text-white top-2 right-2 bg-red-400 rounded-full w-8 h-8"
        >
          X
        </button>
        <Image
          src={src}
          alt={alt}
          className="max-w-full max-h-screen rounded-md object-contain p-10"
          width={1920}
          height={1080}
        />
      </div>
    </div>
  );
}

export default ImageModal;
