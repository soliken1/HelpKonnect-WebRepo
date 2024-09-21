import { deleteCookie } from "cookies-next";

export default function handler(req, res) {
  if (req.method === "POST") {
    deleteCookie("currentUser", { req, res, path: "/" });

    res.status(200).json({ message: "Cookie cleared successfully" });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
