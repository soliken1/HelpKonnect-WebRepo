export const getBookingStatus = (bookingDate) => {
  if (!bookingDate) {
    return { status: "Unknown", className: "text-gray-600" };
  }

  const today = new Date();
  const [day, month, year] = bookingDate.split("/").map(Number);
  const bookingDateObj = new Date(year, month - 1, day);

  today.setHours(0, 0, 0, 0);

  const status =
    bookingDateObj > today ||
    bookingDateObj.toDateString() === today.toDateString()
      ? { status: "Active", className: "text-green-600" }
      : { status: "Done", className: "text-red-600" };

  return status;
};

export const countBookingStatuses = (bookings) => {
  const counts = { active: 0, done: 0 };

  bookings.forEach((booking) => {
    const status = getBookingStatus(booking.bookingDate);
    if (status.status === "Active") {
      counts.active++;
    } else if (status.status === "Done") {
      counts.done++;
    }
  });

  return counts;
};

export const countTotalBookingsForFacility = (bookings, facilityName) => {
  const totalCount = bookings.filter(
    (booking) => booking.facilityName === facilityName
  ).length;
  return totalCount;
};
