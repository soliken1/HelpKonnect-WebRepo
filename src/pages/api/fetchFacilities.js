import { db } from "@/configs/firebaseConfigs";
import { collection, query, where, getDocs } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const q = query(
        collection(db, "credentials"),
        where("role", "==", "facility")
      );
      const querySnapshot = await getDocs(q);

      const fetchFacility = querySnapshot.docs.map((doc) => doc.data());

      res.status(200).json({ fetchFacility });
    } catch (error) {
      console.error("Error fetching data from Firestore:", error);
      res.status(500).json({ error: "Failed to fetch data" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
