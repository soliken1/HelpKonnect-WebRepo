import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { address } = req.query;

    const options = {
      method: "GET",
      url: "https://google-maps-geocoding.p.rapidapi.com/geocode/json",
      params: {
        address: address,
        language: "en",
      },
      headers: {
        "x-rapidapi-key": process.env.GMAP_GEOCODING_KEY,
        "x-rapidapi-host": "google-maps-geocoding.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      res.status(200).json(response.data);
    } catch (error) {
      console.error("Error fetching geolocation data:", error);
      res
        .status(500)
        .json({ error: "Failed to fetch geolocation data", address });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
