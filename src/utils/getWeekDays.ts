export default function getWeekDays(current: Date) {
  const week: Date[] = [];

  for (let i = 0; i < 7; i++) {
    week.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  return week;
}
