import { GeoPoint } from "firebase/firestore";

export async function getCoordinates(address) {
  try {
    const response = await fetch(
      `/api/reverseGeocode?address=${encodeURIComponent(address)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();

    if (data.status === "OK" && data.results.length > 0) {
      const location = data.results[0].geometry.location;
      const { lat, lng } = location;

      const facilityCoordinates = new GeoPoint(lat, lng);

      return facilityCoordinates;
    } else {
      console.error("No results found for the provided address.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    return null;
  }
}
