export const countTotalGains = (bookings, facilityName) => {
  const totalGains = bookings
    .filter((booking) => booking.facilityName === facilityName)
    .reduce((acc, booking) => acc + (booking.amount || 0), 0);

  return totalGains;
};
