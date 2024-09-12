import {
  collection,
  getDocs,
  Timestamp,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/configs/firebaseConfigs";

async function getAverageSessionDurationForRange(startDate, endDate) {
  const sessionCollectionRef = collection(db, "userSessions");

  const q = query(
    sessionCollectionRef,
    where("sessionStart", ">=", startDate),
    where("sessionStart", "<", endDate)
  );

  const querySnapshot = await getDocs(q);

  let totalDuration = 0;
  let sessionCount = 0;

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    if (data.sessionStart && data.sessionEnd) {
      const start = data.sessionStart.toDate();
      const end = data.sessionEnd.toDate();

      if (data.isActive === false) {
        const durationInSeconds = (end - start) / 1000;
        totalDuration += durationInSeconds;
        sessionCount++;
      } else {
        console.warn("Invalid session duration for document ID:", doc.id);
      }
    }
  });

  if (sessionCount === 0) return 0;

  return totalDuration / sessionCount;
}

export async function getTodayAvgSessionDuration() {
  const now = Timestamp.now();
  const startOfToday = new Timestamp(
    now.seconds - (now.seconds % (24 * 60 * 60)),
    now.nanoseconds
  );
  const endOfToday = new Timestamp(
    startOfToday.seconds + 24 * 60 * 60,
    now.nanoseconds
  );

  return getAverageSessionDurationForRange(startOfToday, endOfToday);
}

export async function getPrevDayAvgSessionDuration() {
  const now = Timestamp.now();
  const startOfDayBeforeYesterday = new Timestamp(
    now.seconds - 2 * 24 * 60 * 60,
    now.nanoseconds
  );
  const endOfDayBeforeYesterday = new Timestamp(
    startOfDayBeforeYesterday.seconds + 24 * 60 * 60,
    now.nanoseconds
  );

  return getAverageSessionDurationForRange(
    startOfDayBeforeYesterday,
    endOfDayBeforeYesterday
  );
}
