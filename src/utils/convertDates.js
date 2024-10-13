export const getStartOfWeek = (date) => {
  const start = new Date(date);
  const day = start.getDay();
  const diff = start.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(start.setDate(diff));
};

export const getEndOfWeek = (date) => {
  const end = new Date(date);
  const day = end.getDay();
  const diff = end.getDate() + (7 - day);
  return new Date(end.setDate(diff));
};
