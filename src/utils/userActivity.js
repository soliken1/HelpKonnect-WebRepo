import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/configs/firebaseConfigs";

export async function logUserActivity(userId) {
  const activityRef = doc(db, "userActivity", `${userId}_${Date.now()}`);
  await setDoc(activityRef, {
    lastActive: serverTimestamp(),
  });
}
