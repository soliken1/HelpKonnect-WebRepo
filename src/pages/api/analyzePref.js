import { db } from "@/configs/firebaseConfigs";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { userId, userPref } = req.body;

    if (!userId || !userPref) {
      return res
        .status(400)
        .json({ error: "Missing userId or userPref in request body" });
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

      const docRef = querySnapshot.docs[0].ref;

      await updateDoc(docRef, {
        userPreference: userPref,
      });

      res.status(200).json({ message: "User preference updated successfully" });
    } catch (error) {
      console.error("Error updating userPreference in Firestore:", error);
      res.status(500).json({ error: "Failed to update userPreference" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
