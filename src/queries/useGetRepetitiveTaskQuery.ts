import { useQuery } from '@tanstack/react-query';
import { Dayjs } from 'dayjs';
import { getRepetitiveTasksByDateRange } from '../firebase/read';

export const GET_REPETITIVE_TASK_QUERY_KEY = 'get-repetitive-task';

const useGetRepetitiveTaskQuery = (
  uid: string,
  startDate: Dayjs,
  endDate: Dayjs
) => {
  return useQuery({
    queryKey: [GET_REPETITIVE_TASK_QUERY_KEY, uid, startDate, endDate],
    queryFn: () => getRepetitiveTasksByDateRange(uid, startDate, endDate),
    enabled: !!uid,
  });
};

export default useGetRepetitiveTaskQuery;
