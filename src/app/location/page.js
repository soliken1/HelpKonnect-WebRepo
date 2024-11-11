"use client";
import React from "react";
import dynamic from "next/dynamic";
const Body = dynamic(() => import("@/components/location/Body.js"), {
  ssr: false,
});

function Location() {
  return <Body />;
}

export default Location;
