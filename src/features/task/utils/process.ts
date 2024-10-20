import { RepetitiveTask, Task } from '@/entities/tasks';
import { Dayjs } from 'dayjs';

export const repetitiveTaskToSingleTask = (
  {
    id,
    subject,
    color,
    repeatingType,
    completedDates,
    sortIdxList,
  }: RepetitiveTask,
  date: Dayjs
): Task => {
  try {
    const newTask = {
      id,
      date,
      subject,
      color,
      repeatingType,
      isCompleted: completedDates.includes(date.valueOf()),
      sortIdx:
        sortIdxList && Object.keys(sortIdxList).includes(`${date.valueOf()}`)
          ? sortIdxList[`${date.valueOf()}`]
          : 999,
    };
    return newTask;
  } catch (error) {
    console.log(error);
    return {} as Task;
  }
};

export const getWeekDays = (startDate: Dayjs, endDate: Dayjs) => {
  const days = [];
  for (let i = 0; i <= endDate.diff(startDate, 'day'); i++) {
    days.push(startDate.add(i, 'day'));
  }
  return days;
};
