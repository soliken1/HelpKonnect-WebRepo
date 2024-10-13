import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/configs/firebaseConfigs";

export async function getBannedUserCount() {
  const q = query(collection(db, "credentials"), where("banned", "==", true));

  const querySnapshot = await getDocs(q);
  const bannedUserCount = querySnapshot.size;

  return bannedUserCount;
}

export async function getMarkedAccounts() {
  const q = query(collection(db, "flaggedAccounts"));

  const querySnapshot = await getDocs(q);
  const uniqueUserIds = new Set();
  const uniqueMarkedAccounts = [];

  querySnapshot.docs.forEach((doc) => {
    const data = doc.data();
    if (!uniqueUserIds.has(data.userId)) {
      uniqueUserIds.add(data.userId);
      uniqueMarkedAccounts.push(data);
    }
  });

  return uniqueMarkedAccounts;
}
