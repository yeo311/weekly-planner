import { useQuery } from '@tanstack/react-query';
import { getTasksByDateRange } from '../firebase/read';
import { Dayjs } from 'dayjs';

export const GET_TASKS_QUERY_KEY = 'get-tasks';

const useGetTasksQuery = (uid: string, startDate: Dayjs, endDate: Dayjs) => {
  return useQuery({
    queryKey: [GET_TASKS_QUERY_KEY, uid, startDate, endDate],
    queryFn: () => getTasksByDateRange(uid ?? '', startDate, endDate),
    enabled: !!uid,
  });
};

export default useGetTasksQuery;
