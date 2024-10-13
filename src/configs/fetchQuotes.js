import { db } from "./firebaseConfigs";
import { collection, getDocs } from "firebase/firestore";

export const fetchQuotes = async () => {
  const snapshot = await getDocs(collection(db, "quotes"));
  const quotes = snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      quotes: data.quotes,
      person: data.person,
    };
  });

  if (quotes.length === 0) {
    throw new Error("No quotes found");
  }

  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
};
