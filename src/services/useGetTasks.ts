import useGetTasksQuery from '../queries/useGetTasksQuery';
import useAuth from '../hooks/useAuth';
import { useWeekStore } from '../store/date';
import useGetRepetitiveTaskQuery from '../queries/useGetRepetitiveTaskQuery';
import { Dayjs } from 'dayjs';
import { RepetitiveTask, Task } from '../types/todo';
import { formatKey, toUnix } from '../utils/date';

const checkIfRepeatTodoAreIncludedInThisDate = (
  date: Dayjs,
  task: RepetitiveTask
) => {
  if (date.isBefore(task.startDate)) return false;
  if (task.endDate.isBefore(date)) return false;
  if (task.repeatingType === 'weekly' && task.repeatingNumber !== date.day())
    return false;
  if (task.repeatingType === 'monthly' && task.repeatingNumber !== date.date())
    return false;
  if (
    task.repeatingType === 'weekdays' &&
    (date.day() === 0 || date.day() === 6)
  )
    return false;
  if (!!task.deletedDates && task.deletedDates.includes(toUnix(date)))
    return false;
  return true;
};

const RepetitiveTodoToSingleTodo = (
  {
    id,
    subject,
    color,
    repeatingType,
    completedDates,
    sortIdxList,
  }: RepetitiveTask,
  date: Dayjs
): Task => ({
  id,
  date,
  subject,
  color,
  repeatingType,
  isCompleted: completedDates.includes(toUnix(date)),
  sortIdx:
    sortIdxList && Object.keys(sortIdxList).includes(`${toUnix(date)}`)
      ? sortIdxList[`${toUnix(date)}`]
      : 999,
});

const useGetTasks = () => {
  const auth = useAuth();
  const uid = auth.state === 'success' ? auth.user?.uid ?? '' : '';

  const { weekDays, activeIndex } = useWeekStore();
  const activeWeekDays = weekDays[activeIndex];

  const { data: singleTasks } = useGetTasksQuery(
    uid,
    weekDays[activeIndex].days[0],
    weekDays[activeIndex].days[weekDays[activeIndex].days.length - 1]
  );

  const { data: repetitiveTasks } = useGetRepetitiveTaskQuery(
    uid,
    weekDays[activeIndex].days[0],
    weekDays[activeIndex].days[weekDays[activeIndex].days.length - 1]
  );

  const tasks: Record<string, Task[]> = {};

  activeWeekDays.days.forEach((day) => {
    if (!singleTasks || !repetitiveTasks) return;
    const singleTasksOnThisDay = singleTasks.filter(
      (task) => formatKey(task.date) === formatKey(day)
    );
    const repetitiveTasksOnThisDay = repetitiveTasks
      .filter((task) => checkIfRepeatTodoAreIncludedInThisDate(day, task))
      .map((task) => RepetitiveTodoToSingleTodo(task, day));

    const allTasksOnThisDay = [
      ...singleTasksOnThisDay,
      ...repetitiveTasksOnThisDay,
    ];
    allTasksOnThisDay.sort((a, b) => a.sortIdx - b.sortIdx);
    tasks[formatKey(day)] = allTasksOnThisDay;
  });

  return {
    tasks,
  };
};

export default useGetTasks;
