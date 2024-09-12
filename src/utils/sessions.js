import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/configs/firebaseConfigs";

export async function logSessionStart(userId) {
  const sessionRef = doc(db, "userSessions", userId);
  await setDoc(
    sessionRef,
    {
      sessionStart: serverTimestamp(),
      isActive: true,
    },
    { merge: true }
  );
}

export async function logSessionEnd(userId) {
  const sessionRef = doc(db, "userSessions", userId);
  await setDoc(
    sessionRef,
    {
      sessionEnd: serverTimestamp(),
      isActive: false,
    },
    { merge: true }
  );
}
