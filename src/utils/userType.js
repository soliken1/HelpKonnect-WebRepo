import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/configs/firebaseConfigs";

export async function userType() {
  const userQuery = query(
    collection(db, "credentials"),
    where("role", "in", ["User", "Professionals"])
  );
  const userQSnapshot = await getDocs(userQuery);
  const data = userQSnapshot.docs.map((doc) => doc.data());

  const roleCounts = data.reduce((acc, user) => {
    const role = user.role;
    acc[role] = (acc[role] || 0) + 1;
    return acc;
  }, {});

  return roleCounts;
}
