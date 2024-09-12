import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore";

import { db } from "@/configs/firebaseConfigs";
export async function getDau() {
  const now = Timestamp.now();
  const yesterday = new Timestamp(now.seconds - 24 * 60 * 60, now.nanoseconds);

  const q = query(
    collection(db, "userActivity"),
    where("lastActive", ">=", yesterday)
  );

  const querySnapshot = await getDocs(q);
  const dau = querySnapshot.size;

  return dau;
}

export async function getPrevActivity() {
  const now = Timestamp.now();
  const yesterday = new Timestamp(now.seconds - 24 * 60 * 60, now.nanoseconds);
  const twoDaysAgo = new Timestamp(
    now.seconds - 2 * 24 * 60 * 60,
    now.nanoseconds
  );

  const q = query(
    collection(db, "userActivity"),
    where("lastActive", ">=", twoDaysAgo),
    where("lastActive", "<", yesterday)
  );

  const querySnapshot = await getDocs(q);
  const prevDayActivity = querySnapshot.size;

  return prevDayActivity;
}
