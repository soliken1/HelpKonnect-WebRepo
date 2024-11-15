export default function handler(req, res) {
  if (req.method === "GET") {
    const onesignalKey = process.env.ONESIGNAL_KEY;
    const onesignalID = process.env.ONESIGNAL_ID;

    if (!onesignalKey && !onesignalID) {
      return res.status(500).json({ error: "API keys not found" });
    }

    res.status(200).json({ onesignalKey, onesignalID });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
