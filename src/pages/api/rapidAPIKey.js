export default function handler(req, res) {
  if (req.method === "GET") {
    const rapidAPIKey = process.env.RAPID_API_KEY;

    if (!rapidAPIKey) {
      return res.status(500).json({ error: "API key not found" });
    }

    res.status(200).json({ rapidAPIKey });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
