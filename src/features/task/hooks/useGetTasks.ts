import {
  getRepetitiveTasksByDateRange,
  getTasksByDateRange,
} from '@/entities/tasks';
import { userState } from '@/shared';
import { useQuery } from '@tanstack/react-query';
import { Dayjs } from 'dayjs';
import { checkIsRepetitiveTaskIncludedInThisDate } from '../utils/validations';
import { repetitiveTaskToSingleTask } from '../utils/process';
import { useAtomValue } from 'jotai';

export const GET_TASKS_QUERY_KEY = 'tasks';

export const useGetTasks = (date: Dayjs) => {
  const uid = useAtomValue(userState);

  return useQuery({
    queryKey: [GET_TASKS_QUERY_KEY, uid, date.toISOString()],
    queryFn: async () => {
      const tasks = await getTasksByDateRange(
        uid,
        date.startOf('day').toDate(),
        date.endOf('day').toDate()
      );
      const repetitiveTasks = await getRepetitiveTasksByDateRange(
        uid,
        date.startOf('day').toDate(),
        date.endOf('day').toDate()
      );

      const includeRepetitiveTasks = repetitiveTasks
        .filter((task) => checkIsRepetitiveTaskIncludedInThisDate(date, task))
        .map((task) => repetitiveTaskToSingleTask(task, date));

      return [...tasks, ...includeRepetitiveTasks].sort(
        (a, b) => a.sortIdx - b.sortIdx
      );
    },
    enabled: !!uid,
  });
};
