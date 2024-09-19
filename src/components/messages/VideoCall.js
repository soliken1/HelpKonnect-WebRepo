import React, { useEffect, useRef } from "react";

const VideoCall = ({ remoteStream, localStreamRef, onClose }) => {
  const remoteVideoRef = useRef(null);

  useEffect(() => {
    if (remoteStream) {
      const videoElement = remoteVideoRef.current;
      if (videoElement) {
        videoElement.srcObject = remoteStream;
      }
    }
  }, [remoteStream]);

  return (
    <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-black bg-opacity-50">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white z-50"
      >
        Close
      </button>
      <div className="flex flex-col items-center z-50">
        <video
          ref={localStreamRef}
          autoPlay
          muted
          className="absolute top-4 left-4 w-60 h-60"
        ></video>
      </div>
      <div className="flex flex-col items-center">
        <video
          ref={remoteVideoRef}
          autoPlay
          className="w-screen h-screen"
        ></video>
      </div>
    </div>
  );
};

export default VideoCall;
