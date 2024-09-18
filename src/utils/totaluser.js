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
  const yesterday = new Timestamp(now.seconds - 24 * 60 * 60, now.nanoseconds);
  const twoDaysAgo = new Timestamp(
    now.seconds - 2 * 24 * 60 * 60,
    now.nanoseconds
  );

  const q = query(
    collection(db, "credentials"),
    where("dateCreated", ">=", yesterday),
    where("dateCreated", "<", twoDaysAgo)
  );

  const querySnapshot = await getDocs(q);

  const prevTotalUsers = querySnapshot.docs.filter((doc) => {
    const data = doc.data();
    let dateCreated = data.dateCreated;

    if (typeof dateCreated === "string") {
      const parsedDate = Date.parse(dateCreated);
      if (!isNaN(parsedDate)) {
        dateCreated = Timestamp.fromDate(new Date(parsedDate));
      } else {
        return false;
      }
    }
    return (
      dateCreated.seconds >= startOfDayBeforeYesterday.seconds &&
      dateCreated.seconds < startOfYesterday.seconds
    );
  }).length;

  return prevTotalUsers;
}
