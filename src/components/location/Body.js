import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
  Tooltip,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import { db } from "@/configs/firebaseConfigs";
import { collection, query, where, getDocs } from "firebase/firestore";

const RoutingMachine = ({ userPosition, destination, showDirections }) => {
  const map = useMap();

  useEffect(() => {
    if (!userPosition || !destination || !showDirections) return;

    const routingControl = L.Routing.control({
      waypoints: [L.latLng(userPosition), L.latLng(destination)],
      routeWhileDragging: true,
      router: L.Routing.mapbox(process.env.MAPBOX_TOKEN),
      createMarker: () => null,
    }).addTo(map);

    return () => {
      map.removeControl(routingControl);
    };
  }, [userPosition, destination, map, showDirections]);

  return null;
};

const MapWithRouting = () => {
  const [userPosition, setUserPosition] = useState(null);
  const [facilities, setFacilities] = useState([]);
  const [destination, setDestination] = useState(null);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [showDirections, setShowDirections] = useState(false);

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const q = query(
          collection(db, "credentials"),
          where("role", "==", "facility"),
          where("facilityCoordinates", "!=", null)
        );
        const querySnapshot = await getDocs(q);
        const fetchedFacilities = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            facilityName: data.facilityName,
            coordinates: data.facilityCoordinates,
          };
        });
        setFacilities(fetchedFacilities);
      } catch (error) {
        console.error("Error fetching facilities:", error);
      }
    };

    fetchFacilities();
  }, []);

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

  const handleFacilityClick = (facility) => {
    setSelectedFacility(facility);
    setDestination([
      facility.coordinates.latitude,
      facility.coordinates.longitude,
    ]);
    setShowDirections(true);
  };

  const toggleDirections = () => {
    setShowDirections((prevState) => !prevState);
  };

  return (
    <div className="w-screen h-screen relative">
      <button
        className="px-6 py-2 rounded-full bg-red-300 text-white absolute top-3 left-12 hover:bg-red-400 duration-300 z-10"
        onClick={toggleDirections}
        style={{ margin: "10px" }}
      >
        {showDirections ? "Hide Directions" : "Show Directions"}
      </button>
      <MapContainer
        className="-z-0"
        center={[10.3150363, 123.8916419]}
        zoom={12}
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
          <CircleMarker
            center={userPosition}
            pathOptions={{
              color: "red",
              fillColor: "red",
              fillOpacity: 0.7,
              radius: 10,
            }}
          >
            <Tooltip permanent={true}>You are Here!</Tooltip>
            <Popup>You are here!</Popup>
          </CircleMarker>
        )}

        {facilities.map((facility) => (
          <Marker
            key={facility.id}
            position={[
              facility.coordinates.latitude,
              facility.coordinates.longitude,
            ]}
            eventHandlers={{
              click: () => handleFacilityClick(facility),
            }}
          >
            <Tooltip permanent={true}>{facility.facilityName}</Tooltip>
            <Popup>{facility.facilityName}</Popup>
          </Marker>
        ))}

        {selectedFacility && (
          <CircleMarker
            center={[
              selectedFacility.coordinates.latitude,
              selectedFacility.coordinates.longitude,
            ]}
            pathOptions={{
              color: "red",
              fillColor: "red",
              fillOpacity: 0.7,
              radius: 10,
            }}
          />
        )}

        {userPosition && destination && showDirections && (
          <RoutingMachine
            userPosition={userPosition}
            destination={destination}
            showDirections={showDirections}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default MapWithRouting;
