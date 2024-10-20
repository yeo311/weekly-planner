import { Dayjs } from 'dayjs';

export const getWeekdayFormat = (date: Dayjs) => {
  return ['월', '화', '수', '목', '금', '토', '일'][date.weekday()];
};
