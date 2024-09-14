import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/configs/firebaseConfigs";

export async function getTotalUser() {
  const credentialsCollection = collection(db, "credentials");

  const querySnapshot = await getDocs(credentialsCollection);
  const totalUsers = querySnapshot.size;

  return totalUsers;
}

export async function getPrevTotalUser() {
  const now = Timestamp.now();

  const startOfToday = new Timestamp(
    now.seconds - (now.seconds % (24 * 60 * 60)),
    0
  );
  const startOfYesterday = new Timestamp(
    startOfToday.seconds - 24 * 60 * 60,
    0
  );
  const startOfDayBeforeYesterday = new Timestamp(
    startOfYesterday.seconds - 24 * 60 * 60,
    0
  );

  const q = query(
    collection(db, "credentials"),
    where("dateCreated", ">=", startOfDayBeforeYesterday),
    where("dateCreated", "<", startOfYesterday)
  );

  const querySnapshot = await getDocs(q);
  const prevTotalUsers = querySnapshot.size;

  return prevTotalUsers;
}
