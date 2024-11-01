import React, { useEffect, useState } from "react";
import Table from "./Table";
import Header from "./Header";
import { db } from "@/configs/firebaseConfigs";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import BookingAnalytics from "./BookingAnalytics";
function Body({ user }) {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const bookingsCollection = await getDocs(collection(db, "bookings"));
      const bookingsData = await Promise.all(
        bookingsCollection.docs.map(async (docSnapshot) => {
          const booking = docSnapshot.data();
          const userDoc = await getDoc(doc(db, "credentials", booking.userId));
          const professionalDoc = await getDoc(
            doc(db, "credentials", booking.professionalId)
          );

          return {
            ...booking,
            user: userDoc.exists() ? userDoc.data() : null,
            professional: professionalDoc.exists()
              ? professionalDoc.data()
              : null,
          };
        })
      );
      setBookings(bookingsData);
    };

    fetchBookings();
  }, []);
  return (
    <div className="w-full flex flex-col p-10">
      <Header user={user} />
      <div className="h-20 flex flex-row gap-5 items-center w-full mt-2">
        <button
          className="shadow-md py-2 px-8 rounded-full hover:bg-red-300 duration-300 hover:text-white"
          type="button"
        >
          Today
        </button>
        <button
          className="shadow-md py-2 px-8 rounded-full hover:bg-red-300 duration-300 hover:text-white"
          type="button"
        >
          Active
        </button>
      </div>
      <div className="flex flex-row gap-4 flex-nowrap h-full">
        <div className="overflow-x-auto shadow-md rounded-md w-9/12 mt-2">
          <Table bookings={bookings} />
        </div>
        <BookingAnalytics />
      </div>
    </div>
  );
}

export default Body;
