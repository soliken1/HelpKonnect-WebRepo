export const getBookingStatus = (bookingDate) => {
  const today = new Date();
  const [day, month, year] = bookingDate.split("/").map(Number);
  const bookingDateObj = new Date(year, month - 1, day);

  today.setHours(0, 0, 0, 0);

  if (
    bookingDateObj > today ||
    bookingDateObj.toDateString() === today.toDateString()
  ) {
    return { status: "Active", className: "text-green-600" };
  } else {
    return { status: "Done", className: "text-red-600" };
  }
};
