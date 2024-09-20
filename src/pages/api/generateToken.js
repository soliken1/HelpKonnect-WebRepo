import { StreamChat } from "stream-chat";

export default async function handler(req, res) {
  const { userId } = req.body;

  const serverClient = StreamChat.getInstance(
    process.env.STREAM_API_KEY,
    process.env.STREAM_API_SECRET
  );

  try {
    const token = serverClient.createToken(userId);
    res.status(200).json({ token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error generating token", error: error.message });
  }
}
