export default function handler(req, res) {
  if (req.method === "GET") {
    const streamKey = process.env.STREAM_API_KEY;
    const streamSecret = process.env.STREAM_API_SECRET;
    const streamCall = process.env.STREAM_API_CALLKEY;

    if (!streamKey && !streamSecret && !streamCall) {
      return res.status(500).json({ error: "API keys not found" });
    }

    res.status(200).json({ streamKey, streamSecret, streamCall });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
