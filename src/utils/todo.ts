import { RepetitiveTodo, Todo } from '../types/todo';

export function RepetitiveTodoToSingleTodo(
  {
    id,
    subject,
    color,
    repeatingType,
    completedDates,
    sortIdxList,
  }: RepetitiveTodo,
  date: Date
): Todo {
  return {
    id,
    date,
    subject,
    color,
    repeatingType,
    isCompleted: completedDates.includes(date.getTime()),
    sortIdx:
      sortIdxList && Object.keys(sortIdxList).includes(`${date.getTime()}`)
        ? sortIdxList[`${date.getTime()}`]
        : 999,
  };
}
