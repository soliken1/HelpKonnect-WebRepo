import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import { db } from "@/configs/firebaseConfigs";
import { collection, query, where, getDocs } from "firebase/firestore";

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
  const [facilities, setFacilities] = useState([]);
  const [destination, setDestination] = useState(null);
  const [selectedFacility, setSelectedFacility] = useState(null);

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

  return (
    <MapContainer
      center={[10.3150363, 123.8916419]}
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
        <CircleMarker
          center={userPosition}
          pathOptions={{
            color: "",
            fillColor: "red",
            fillOpacity: 0.7,
            radius: 8,
          }}
        >
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
            click: () => {
              setSelectedFacility(facility);
              setDestination([
                facility.coordinates.latitude,
                facility.coordinates.longitude,
              ]);
            },
          }}
        >
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

      {userPosition && destination && (
        <RoutingMachine userPosition={userPosition} destination={destination} />
      )}
    </MapContainer>
  );
};

export default MapWithRouting;
