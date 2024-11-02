import { db } from "@/configs/firebaseConfigs";
import { collection, getDocs } from "firebase/firestore";

export const revenue = async () => {
  try {
    const bookingsSnapshot = await getDocs(collection(db, "bookings"));
    const bookings = bookingsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const totalRevenue = bookings.reduce(
      (acc, booking) => acc + (booking.amount || 0),
      0
    );

    return totalRevenue;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return 0;
  }
};
