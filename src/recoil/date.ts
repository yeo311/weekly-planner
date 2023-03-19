import { atom, selector } from 'recoil';
import { getThisWeekDateArray } from '../utils/date';

export const currentWeekState = atom<Date[]>({
  key: 'currentWeekState',
  default: [],
});

export const currentDateState = atom<Date>({
  key: 'currentDateState',
  default: new Date(),
});

export const currentWeekDaysState = selector({
  key: 'currentWeekDaysState',
  get: ({ get }) => {
    const currentDate = get(currentDateState);
    return getThisWeekDateArray(currentDate);
  },
});
