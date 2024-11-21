import { StreamChat } from "stream-chat";

export default async function handler(req, res) {
  const { userId, username } = req.body;

  const serverClient = StreamChat.getInstance(
    process.env.STREAM_API_KEY,
    process.env.STREAM_API_SECRET
  );

  try {
    await serverClient.upsertUsers([
      {
        id: userId,
        name: username,
        role: "admin",
      },
    ]);
    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
}
