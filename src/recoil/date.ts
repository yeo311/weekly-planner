import { atom, selector } from 'recoil';
import { syncEffect } from 'recoil-sync';
import { getThisWeekDateArray } from '../utils/date';
import { number } from '@recoiljs/refine';

export const currentDateState = atom<number>({
  key: 'currentDateState',
  default: new Date().getTime(),
  effects: [syncEffect({ refine: number(), syncDefault: true })],
});

export const currentWeekDaysState = selector({
  key: 'currentWeekDaysState',
  get: ({ get }) => {
    const currentDate = get(currentDateState);
    return getThisWeekDateArray(new Date(currentDate));
  },
});
