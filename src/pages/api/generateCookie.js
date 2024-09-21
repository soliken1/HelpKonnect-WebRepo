import { setCookie } from "cookies-next";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { userId, email } = req.body;

    setCookie("currentUser", JSON.stringify({ userId, email }), {
      req,
      res,
      httpOnly: true,
      maxAge: 60 * 60 * 24,
    });

    res.status(200).json({ message: "Cookie set successfully" });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
