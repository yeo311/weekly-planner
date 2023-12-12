import { RepetitiveTask, Task } from '../types/todo';

export function RepetitiveTodoToSingleTodo(
  {
    id,
    subject,
    color,
    repeatingType,
    completedDates,
    sortIdxList,
  }: RepetitiveTask,
  date: Date
): Task {
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
