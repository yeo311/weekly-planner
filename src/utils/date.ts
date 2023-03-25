import { RepetitiveTodo } from '../types/todo';

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

export function checkIfRepeatTodoAreIncludedInThisDate(
  date: Date,
  todo: RepetitiveTodo
) {
  if (todo.startDate.getTime() > date.getTime()) return false;
  if (todo.endDate.getTime() < date.getTime()) return false;

  if (
    todo.repeatingType === 'weekly' &&
    todo.repeatingNumber !== date.getDay()
  ) {
    return false;
  }

  if (
    todo.repeatingType === 'monthly' &&
    todo.repeatingNumber !== date.getDate()
  ) {
    return false;
  }

  if (
    todo.repeatingType === 'weekdays' &&
    (date.getDay() === 0 || date.getDay() === 6)
  ) {
    return false;
  }

  if (!!todo.deletedDates && todo.deletedDates.includes(date.getTime())) {
    return false;
  }

  return true;
}
