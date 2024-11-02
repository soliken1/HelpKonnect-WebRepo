export const filterBookingsByTimeFrame = (bookings, timeFrameFilter) => {
  const today = new Date();
  let filtered = bookings;

  if (timeFrameFilter === "Today") {
    filtered = filtered.filter((booking) => {
      const bookingDate = new Date(
        booking.bookingDate.split("/").reverse().join("-")
      );
      return bookingDate.toDateString() === today.toDateString();
    });
  } else if (timeFrameFilter === "This Week") {
    const startOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay())
    );
    const endOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay() + 6)
    );
    filtered = filtered.filter((booking) => {
      const bookingDate = new Date(
        booking.bookingDate.split("/").reverse().join("-")
      );
      return bookingDate >= startOfWeek && bookingDate <= endOfWeek;
    });
  } else if (timeFrameFilter === "This Month") {
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    filtered = filtered.filter((booking) => {
      const bookingDate = new Date(
        booking.bookingDate.split("/").reverse().join("-")
      );
      return bookingDate >= startOfMonth && bookingDate <= endOfMonth;
    });
  }

  return filtered;
};
