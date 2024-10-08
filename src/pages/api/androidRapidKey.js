export default function handler(req, res) {
  if (req.method === "GET") {
    const androidRapidKey = process.env.ANDROID_RAPID_API_KEY;

    if (!androidRapidKey) {
      return res.status(500).json({ error: "API key not found" });
    }

    res.status(200).json({ androidRapidKey });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
