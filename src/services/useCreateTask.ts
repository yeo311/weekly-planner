import { useQueryClient } from '@tanstack/react-query';
import useAuth from '../hooks/useAuth';
import useCreateTaskMutation from '../queries/useCreateTaskMutation';
import { useWeekStore } from '../store/date';
import { RepetitiveTask, Task } from '../types/task.types';
import { GET_REPETITIVE_TASK_QUERY_KEY } from '../queries/useGetRepetitiveTaskQuery';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { GET_TASKS_QUERY_KEY } from '../queries/useGetTasksQuery';
dayjs.extend(isBetween);

const useCreateTask = (task: Task | RepetitiveTask) => {
  const auth = useAuth();
  const uid = auth.state === 'success' ? auth.user?.uid ?? '' : '';
  const { weekDays } = useWeekStore();
  const queryClient = useQueryClient();

  return useCreateTaskMutation(uid, task, {
    onSuccess: () => {
      weekDays.forEach((week) => {
        const firstDayOfWeek = week.days[0];
        const lastDayOfWeek = week.days[week.days.length - 1];

        if (task.isRepeated) {
          queryClient.invalidateQueries({
            queryKey: [
              GET_REPETITIVE_TASK_QUERY_KEY,
              uid,
              firstDayOfWeek,
              lastDayOfWeek,
            ],
          });
        } else if (task.date.isBetween(firstDayOfWeek, lastDayOfWeek)) {
          queryClient.invalidateQueries({
            queryKey: [GET_TASKS_QUERY_KEY, uid, firstDayOfWeek, lastDayOfWeek],
          });
        }
      });
    },
    onError: () => {
      window.alert('할일 추가에 실패했습니다.');
    },
  });
};

export default useCreateTask;
