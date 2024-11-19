import { db } from "@/configs/firebaseConfigs";
import { collection, getDocs } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "Missing userId in request body" });
    }

    try {
      const userAnswersRef = collection(db, `answers/${userId}/userAnswers`);
      const userAnswersSnapshot = await getDocs(userAnswersRef);

      const userAnswers = userAnswersSnapshot.docs.map((doc) => ({
        ...doc.data(),
      }));

      if (userAnswers.length === 0) {
        return res.status(404).json({ error: "No user answers found" });
      }

      res.status(200).json({ userAnswers });
    } catch (error) {
      console.error("Error fetching user answers from Firestore:", error);
      res.status(500).json({ error: "Failed to fetch user answers" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
