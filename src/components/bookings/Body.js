import React, { useEffect, useState } from "react";
import Table from "./Table";
import Header from "./Header";
import { db } from "@/configs/firebaseConfigs";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import BookingAnalytics from "./BookingAnalytics";
import { getCookie } from "cookies-next";
import { getBookingStatus } from "@/utils/bookingStatus";
import { filterBookingsByTimeFrame } from "@/utils/filterBookings";

function Body({ user }) {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [timeFrameFilter, setTimeFrameFilter] = useState("All");
  const facilityName = getCookie("user");

  useEffect(() => {
    const fetchBookings = async () => {
      const bookingsCollection = await getDocs(collection(db, "bookings"));

      const bookingsData = await Promise.all(
        bookingsCollection.docs.map(async (docSnapshot) => {
          const booking = docSnapshot.data();

          const userDoc = await getDoc(doc(db, "credentials", booking.userId));

          let professionalData = null;
          if (booking.professionalId && booking.professionalId.trim() !== "") {
            const professionalDoc = await getDoc(
              doc(db, "credentials", booking.professionalId)
            );
            professionalData = professionalDoc.exists()
              ? professionalDoc.data()
              : null;
          } else {
            professionalData = { firstName: "", lastName: "" };
          }

          return {
            ...booking,
            user: userDoc.exists() ? userDoc.data() : null,
            professional: professionalData,
          };
        })
      );

      setBookings(bookingsData);
      setFilteredBookings(bookingsData);
    };

    fetchBookings();
  }, []);

  useEffect(() => {
    const filterBookings = () => {
      let filtered = bookings;

      if (statusFilter !== "All") {
        filtered = filtered.filter((booking) => {
          const { status } = getBookingStatus(booking.bookingDate);
          return status === statusFilter;
        });
      }

      filtered = filterBookingsByTimeFrame(filtered, timeFrameFilter);

      setFilteredBookings(filtered);
    };

    filterBookings();
  }, [statusFilter, timeFrameFilter, bookings]);

  const toggleStatusFilter = () => {
    setStatusFilter((prev) => {
      if (prev === "Active") return "Done";
      if (prev === "Done") return "All";
      return "Active";
    });
  };

  const toggleTimeFrameFilter = () => {
    setTimeFrameFilter((prev) => {
      if (prev === "Today") return "This Week";
      if (prev === "This Week") return "This Month";
      if (prev === "This Month") return "All";
      return "Today";
    });
  };

  return (
    <div className="w-full flex flex-col p-10">
      <Header user={user} />
      <div className="h-20 flex flex-row gap-5 items-center w-full mt-2">
        <button
          className={`shadow-md py-2 px-8 rounded-full ${
            statusFilter === "Active"
              ? "bg-red-300 text-white"
              : "hover:bg-red-300 duration-300"
          }`}
          type="button"
          onClick={toggleStatusFilter}
        >
          {statusFilter}
        </button>
        <button
          className={`shadow-md py-2 px-8 rounded-full ${
            timeFrameFilter === "All"
              ? "bg-red-300 text-white"
              : "hover:bg-red-300 duration-300"
          }`}
          type="button"
          onClick={toggleTimeFrameFilter}
        >
          {timeFrameFilter}
        </button>
      </div>
      <div className="flex flex-row gap-4 flex-nowrap h-full">
        <div className="overflow-x-auto shadow-md rounded-md w-9/12 mt-2">
          <Table bookings={filteredBookings} />
        </div>
        <BookingAnalytics
          bookings={filteredBookings}
          facilityName={facilityName}
        />
      </div>
    </div>
  );
}

export default Body;
