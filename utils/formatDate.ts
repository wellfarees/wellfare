export const formatDate = (date: Date): string => {
  const padStart = (symbol: string, num: number): string => {
    return num < 10 ? symbol + num : num.toString();
  };

  return `${padStart("0", date.getMonth() + 1)}/${padStart(
    "0",
    date.getDate()
  )}/${date.getFullYear()}`;
};
