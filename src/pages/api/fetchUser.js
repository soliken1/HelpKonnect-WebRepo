import { db } from "@/configs/firebaseConfigs";
import { collection, query, where, getDocs } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "Missing userId in request body" });
    }

    try {
      const q = query(
        collection(db, "credentials"),
        where("userId", "==", userId)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        return res.status(404).json({ error: "User not found" });
      }

      const fetchUserPreference = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return data.userPreference;
      });

      res.status(200).json({ userPreference: fetchUserPreference[0] });
    } catch (error) {
      console.error("Error fetching data from Firestore:", error);
      res.status(500).json({ error: "Failed to fetch data" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
