import { atom } from 'recoil';

export const thisWeekState = atom<Date[]>({
  key: 'thisWeekState',
  default: [],
});
