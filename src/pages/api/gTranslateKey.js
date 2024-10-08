export default function handler(req, res) {
  if (req.method === "GET") {
    const gtranslateKey = process.env.GTRANSLATE_API_KEY;

    if (!gtranslateKey) {
      return res.status(500).json({ error: "API key not found" });
    }

    res.status(200).json({ gtranslateKey });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
