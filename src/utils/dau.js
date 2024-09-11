import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore";

import { db } from "@/configs/firebaseConfigs";
export async function getDailyActiveUsers() {
  const now = Timestamp.now();
  const showWeek = new Timestamp(
    now.seconds - 24 * 60 * 60 * 7,
    now.nanoseconds
  );

  const q = query(
    collection(db, "userActivity"),
    where("lastActive", ">=", showWeek)
  );

  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => doc.data());

  return data;
}
