import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/configs/firebaseConfigs";

export async function getTotalParticipants(facility) {
  const q = query(
    collection(db, "participated"),
    where("facilityName", "==", facility)
  );

  const querySnapshot = await getDocs(q);
  const totalFacilityCount = querySnapshot.size;

  return totalFacilityCount;
}

export async function getSpecificParticipants(facility, event) {
  const q = query(
    collection(db, "participated"),
    where("facilityName", "==", facility),
    where("eventName", "==", event)
  );

  const querySnapshot = await getDocs(q);
  const totalFacilityCount = querySnapshot.size;

  return totalFacilityCount;
}
