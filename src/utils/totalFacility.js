import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/configs/firebaseConfigs";

export async function getTotalFacilityCount() {
  const q = query(
    collection(db, "credentials"),
    where("role", "==", "facility")
  );

  const querySnapshot = await getDocs(q);
  const totalFacilityCount = querySnapshot.size;

  return totalFacilityCount;
}
