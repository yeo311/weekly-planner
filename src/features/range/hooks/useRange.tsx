import dayjs, { Dayjs } from 'dayjs';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useRange = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const start = searchParams.get('start');
  const end = searchParams.get('end');

  const startDate = useMemo(() => {
    return start
      ? dayjs(start).startOf('day')
      : dayjs().startOf('week').startOf('day');
  }, [start]);

  const endDate = useMemo(() => {
    return end ? dayjs(end).endOf('day') : dayjs().endOf('week').endOf('day');
  }, [end]);

  const setRange = (start: Dayjs, end: Dayjs) => {
    setSearchParams({ start: start.toISOString(), end: end.toISOString() });
  };

  return { startDate, endDate, setRange };
};
