export function getThisWeekDateArray(date?: Date) {
  const currentDay = date
    ? new Date(date.getFullYear(), date.getMonth(), date.getDate())
    : new Date();
  const thisYear = currentDay.getFullYear();
  const thisMonth = currentDay.getMonth();
  const thisDate = currentDay.getDate();
  const theDayOfWeek = currentDay.getDay();
  const thisWeekDateArray = Array.from({ length: 7 }, (_, k) => k + 1).map(
    (i) =>
      new Date(Date.UTC(thisYear, thisMonth, thisDate + (i - theDayOfWeek)))
  );
  return thisWeekDateArray;
}

export const dayArr = ['일', '월', '화', '수', '목', '금', '토'];
