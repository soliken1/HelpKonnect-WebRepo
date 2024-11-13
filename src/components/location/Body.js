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
import Image from "next/image";

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
  const [filteredFacilities, setFilteredFacilities] = useState([]);
  const [destination, setDestination] = useState(null);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [showDirections, setShowDirections] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
        setFilteredFacilities(fetchedFacilities);
      } catch (error) {
        console.error("Error fetching facilities:", error);
      }
    };

    fetchFacilities();
  }, []);

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredFacilities(facilities);
    } else {
      setFilteredFacilities(
        facilities.filter((facility) =>
          facility.facilityName
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, facilities]);

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
      <div className="flex flex-row gap-2 absolute bottom-8 left-6 w-auto h-auto justify-center text-xs items-center z-10">
        <button
          className="py-1 px-1 rounded-full flex justify-center items-center bg-red-300 text-white hover:bg-red-400 duration-300 "
          onClick={toggleDirections}
          style={{ margin: "10px" }}
        >
          {showDirections ? (
            <Image
              src="/Icons/EyeOnIcon.png"
              className="w-auto h-auto"
              width={1920}
              height={1080}
            />
          ) : (
            <Image
              src="/Icons/EyeOffIcon.png"
              className="w-auto h-auto"
              width={1920}
              height={1080}
            />
          )}
        </button>
        <input
          placeholder="Search..."
          type="text"
          className="px-2 py-2 w-44 rounded-md text-xs"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

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
          </CircleMarker>
        )}

        {filteredFacilities.map((facility) => (
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
