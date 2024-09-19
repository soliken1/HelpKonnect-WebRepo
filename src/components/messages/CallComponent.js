import React, { useEffect, useRef, useState } from "react";
import SimplePeer from "simple-peer";
import { db } from "@/configs/firebaseConfigs";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import VideoCall from "./VideoCall";

const CallComponent = ({ selectedUser, currentUser }) => {
  const [remoteStream, setRemoteStream] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const localStreamRef = useRef(null); // Ensure it’s a ref object
  const peerRef = useRef(null);
  const callId = useRef(null);

  useEffect(() => {
    const unsubscribe = listenForCalls();
    return () => unsubscribe();
  }, [currentUser]);

  const getUserMedia = async () => {
    setIsModalOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (localStreamRef.current) {
        localStreamRef.current.srcObject = stream;
      } else {
        console.error("Local stream video element not found.");
      }
      return stream;
    } catch (err) {
      console.error("Error accessing media devices.", err);
    }
  };

  const startCall = async () => {
    const stream = await getUserMedia();

    const peer = new SimplePeer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", async (offer) => {
      const callDoc = await addDoc(collection(db, "calls"), {
        offer: offer,
        callerId: currentUser,
        receiverId: selectedUser.userId,
        status: "calling",
      });

      callId.current = callDoc.id;
    });

    peer.on("stream", (remoteStream) => {
      console.log("Caller received remote stream:", remoteStream);
      setRemoteStream(remoteStream);
    });

    peerRef.current = peer;
  };

  const answerCall = async () => {
    if (!callId.current) {
      console.error("No call ID available.");
      return;
    }

    const stream = await getUserMedia();

    const peer = new SimplePeer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", async (answer) => {
      const callDoc = doc(db, "calls", callId.current);
      await updateDoc(callDoc, { answer: answer, status: "in-progress" });
    });

    peer.on("stream", (remoteStream) => {
      console.log("Receiver received remote stream:", remoteStream);
      setRemoteStream(remoteStream);
      setIsModalOpen(true);
    });

    const callDoc = await getDoc(doc(db, "calls", callId.current));
    if (callDoc.exists()) {
      const offer = callDoc.data().offer;
      peer.signal(offer);
    } else {
      console.error("Call document not found.");
    }

    peerRef.current = peer;
  };

  const listenForCalls = () => {
    const callRef = collection(db, "calls");
    const unsubscribe = onSnapshot(callRef, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const callData = change.doc.data();
          if (callData.receiverId === currentUser) {
            callId.current = change.doc.id;
            console.log("Incoming call from:", callData.callerId);
          }
        }
      });
    });

    return unsubscribe;
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setRemoteStream(null);
  };

  return (
    <div className="flex flex-row items-center gap-5">
      <button onClick={answerCall}>
        <img src="/CallIcon.svg" alt="Answer Call" />
      </button>
      <button onClick={startCall}>
        <img src="/VideoCall.svg" alt="Start Call" />
      </button>
      {isModalOpen && (
        <VideoCall
          remoteStream={remoteStream}
          localStreamRef={localStreamRef} // Pass the ref correctly
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default CallComponent;
