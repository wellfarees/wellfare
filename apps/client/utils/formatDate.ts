export const formatDate = (date: Date | number): string => {
  date = new Date(date);
  const padStart = (symbol: string, num: number): string => {
    return num < 10 ? symbol + num : num.toString();
  };

  return `${padStart("0", date.getMonth() + 1)}/${padStart(
    "0",
    date.getDate()
  )}/${date.getFullYear()}`;
};
