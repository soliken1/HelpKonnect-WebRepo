export default function handler(req, res) {
  if (req.method === "GET") {
    const filterKey = process.env.RAPID_API_KEY;
    const filterHost = process.env.RAPID_API_HOST;

    if (!filterKey && !filterHost) {
      return res.status(500).json({ error: "API keys not found" });
    }

    res.status(200).json({ filterKey, filterHost });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
