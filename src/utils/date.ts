import dayjs, { type Dayjs } from 'dayjs';

export function getThisWeekDateArray(date?: Date) {
  const currentDay = date
    ? new Date(date.getFullYear(), date.getMonth(), date.getDate())
    : new Date();

  const thisYear = currentDay.getFullYear();
  const thisMonth = currentDay.getMonth();
  const thisDate = currentDay.getDate();
  const theDayOfWeek = currentDay.getDay();
  const calcWeekCount = theDayOfWeek === 0 ? 7 : theDayOfWeek;
  const thisWeekDateArray = Array.from({ length: 7 }, (_, k) => k + 1).map(
    (i) =>
      new Date(Date.UTC(thisYear, thisMonth, thisDate + (i - calcWeekCount)))
  );
  return thisWeekDateArray;
}

/**
 * 한 주의 날짜 배열을 반환
 * @param weekOffset - 현재 주로부터의 주 오프셋. 기본값은 0.
 * @returns 날짜 배열
 */
export function getWeekDays(weekOffset = 0) {
  const today = dayjs();
  const startOfWeek = today.startOf('week').add(1 + 7 * weekOffset, 'day');
  const endOfWeek = today.endOf('week').add(1 + 7 * weekOffset, 'day');
  const days = [];

  let day = startOfWeek;

  while (day <= endOfWeek) {
    days.push(day);
    day = day.add(1, 'day');
  }

  return days;
}

export const dayArr = ['일', '월', '화', '수', '목', '금', '토'];

export function isSameDate(date1: Date, date2: Date) {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
}

export const TASK_KEY_FORMAT = 'YYYY-MM-DD';

export const formatKey = (date: Dayjs) => date.format(TASK_KEY_FORMAT);

export const toUnix = (date: Dayjs) => date.unix() * 1000;
