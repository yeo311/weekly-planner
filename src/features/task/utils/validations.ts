import { RepetitiveTask } from '@/entities/tasks';
import { Dayjs } from 'dayjs';

export function checkIsRepetitiveTaskIncludedInThisDate(
  date: Dayjs,
  task: RepetitiveTask
) {
  if (task.startDate.isAfter(date)) return false;
  if (task.endDate.isBefore(date)) return false;

  if (task.repeatingType === 'weekly' && task.repeatingNumber !== date.day()) {
    return false;
  }

  if (
    task.repeatingType === 'monthly' &&
    task.repeatingNumber !== date.date()
  ) {
    return false;
  }

  if (
    task.repeatingType === 'weekdays' &&
    (date.day() === 0 || date.day() === 6)
  ) {
    return false;
  }

  if (!!task.deletedDates && task.deletedDates.includes(date.valueOf())) {
    return false;
  }

  return true;
}
