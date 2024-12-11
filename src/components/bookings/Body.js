import React, { useEffect, useState } from "react";
import Table from "./Table";
import Header from "./Header";
import { db } from "@/configs/firebaseConfigs";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import BookingAnalytics from "./BookingAnalytics";
import { getCookie } from "cookies-next";
import { getBookingStatus } from "@/utils/bookingStatus";
import { filterBookingsByTimeFrame } from "@/utils/filterBookings";
import { ToastContainer } from "react-toastify";
import { toast, Bounce } from "react-toastify";

function Body({ user }) {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [timeFrameFilter, setTimeFrameFilter] = useState("All");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [professionalName, setProfessionalName] = useState("");
  const [professionalDetails, setProfessionalDetails] = useState(null);

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

  const handleRowClick = (booking) => {
    setSelectedBooking(booking);
    setModalVisible(true);
  };

  const fetchProfessionalDetails = async (name) => {
    const professionalsCollection = await getDocs(
      collection(db, "credentials")
    );

    const professionalDoc = professionalsCollection.docs.find((doc) => {
      const data = doc.data();
      const fullName = `${data.firstName} ${data.lastName}`.toLowerCase();

      return (
        fullName.includes(name.toLowerCase()) && data.role === "Professional"
      );
    });

    if (professionalDoc) {
      setProfessionalDetails(professionalDoc.data());
    } else {
      setProfessionalDetails(null);
    }
  };

  const handleNameChange = (e) => {
    const name = e.target.value;
    setProfessionalName(name);
    if (name) {
      fetchProfessionalDetails(name);
    } else {
      setProfessionalDetails(null);
    }
  };

  const updateBookingProfessional = async () => {
    if (selectedBooking && professionalDetails) {
      const bookingsCollection = collection(db, "bookings");
      const q = query(
        bookingsCollection,
        where("bookingId", "==", selectedBooking.bookingId)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const bookingDoc = querySnapshot.docs[0];
        const bookingRef = doc(db, "bookings", bookingDoc.id);

        const sessionDuration = parseFloat(selectedBooking.sessionDuration);

        if (isNaN(sessionDuration)) {
          console.error("Invalid session duration");
          return;
        }

        const amount = professionalDetails.rate * sessionDuration;

        await updateDoc(bookingRef, {
          professionalId: professionalDetails.userId,
          status: true,
          amount: amount,
        });

        setModalVisible(false);
        toast.success("Successfully Set Professional to User!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
        window.location.reload();
      } else {
        console.error("Booking not found");
      }
    }
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
          <Table bookings={filteredBookings} handleRowClick={handleRowClick} />
        </div>
        <BookingAnalytics
          bookings={filteredBookings}
          facilityName={facilityName}
        />
      </div>
      {modalVisible && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl font-bold">
              Select Professional for Booking
            </h2>
            <input
              type="text"
              value={professionalName}
              onChange={handleNameChange}
              placeholder="Enter professional's name"
              className="mt-2 p-2 border border-gray-300 rounded-md w-full"
            />
            {professionalDetails && (
              <div className="mt-4">
                <h3>
                  {professionalDetails.firstName} {professionalDetails.lastName}
                </h3>
                <p>Rate: ₱{professionalDetails.rate}</p>
              </div>
            )}
            <div className="mt-4 flex justify-end gap-4">
              <button
                onClick={() => setModalVisible(false)}
                className="py-2 px-4 bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={updateBookingProfessional}
                className="py-2 px-4 bg-red-400 text-white rounded-md"
              >
                Assign Professional
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default Body;
