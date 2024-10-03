export default function handler(req, res) {
  if (req.method === "GET") {
    const apiKey = process.env.OPEN_WEATHER_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "API key not found" });
    }

    res.status(200).json({ apiKey });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
