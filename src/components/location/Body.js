"use client";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";

const RoutingMachine = ({ userPosition, destination }) => {
  const map = useMap();

  useEffect(() => {
    if (!userPosition || !destination) return;

    const routingControl = L.Routing.control({
      waypoints: [L.latLng(userPosition), L.latLng(destination)],
      routeWhileDragging: true,
      router: L.Routing.mapbox(process.env.MAPBOX_TOKEN),
    }).addTo(map);

    return () => {
      map.removeControl(routingControl);
    };
  }, [userPosition, destination, map]);

  return null;
};

const MapWithRouting = () => {
  const [userPosition, setUserPosition] = useState(null);
  const [destination, setDestination] = useState(null);

  const ucBanilad = [10.3384, 123.9117];
  const ucMain = [10.2969648, 123.896915672416];

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserPosition([latitude, longitude]);
      },
      (error) => {
        console.error("Location access denied:", error);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  return (
    <MapContainer
      center={ucBanilad}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${process.env.MAPBOX_TOKEN}`}
        id="mapbox/streets-v11"
        tileSize={512}
        zoomOffset={-1}
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
      />

      {userPosition && (
        <Marker position={userPosition}>
          <Popup>You are here!</Popup>
        </Marker>
      )}

      <Marker
        position={ucBanilad}
        eventHandlers={{
          click: () => setDestination(ucBanilad),
        }}
      >
        <Popup>University of Cebu Banilad</Popup>
      </Marker>

      <Marker
        position={ucMain}
        eventHandlers={{
          click: () => setDestination(ucMain),
        }}
      >
        <Popup>University of Cebu Main</Popup>
      </Marker>

      {userPosition && destination && (
        <RoutingMachine userPosition={userPosition} destination={destination} />
      )}
    </MapContainer>
  );
};

export default MapWithRouting;
