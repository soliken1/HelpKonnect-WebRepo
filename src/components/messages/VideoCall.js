"use client";
import {
  CallControls,
  CallingState,
  CallState,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import { getCookie } from "cookies-next";

const apiKey = process.env.STREAM_API_CALLKEY;

export default function VideoCall({ currentUser, selectedUser, onEndCall }) {
  const callId = currentUser + selectedUser.userId;
  const user = {
    id: currentUser,
    name: getCookie("user"),
  };

  const tokenProvider = async () => {
    const response = await fetch(
      "https://pronto.getstream.io/api/auth/create-token?" +
        new URLSearchParams({
          api_key: apiKey,
          user_id: currentUser,
        })
    );
    const { token } = await response.json();
    return token;
  };

  const client = new StreamVideoClient({ apiKey, user, tokenProvider });
  const call = client.call("default", callId);
  call.join({ create: true });
  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <MyUILayout />
      </StreamCall>
    </StreamVideo>
  );
}

import { useEffect } from "react";
import MessageLoading from "../loaders/Message/MessageLoading";

export const MyUILayout = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  useEffect(() => {
    if (
      callingState === CallingState.LEFT ||
      callingState === CallingState.OFFLINE
    ) {
      window.location.reload();
    }
  }, [callingState]);

  if (callingState !== CallingState.JOINED) {
    return <MessageLoading />;
  }

  return (
    <StreamTheme>
      <SpeakerLayout participantsBarPosition="bottom" />
      <CallControls />
    </StreamTheme>
  );
};
