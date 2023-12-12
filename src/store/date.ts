import { create } from 'zustand';
import { getWeekDays } from '../utils/date';
import * as dayjs from 'dayjs';

type WeekDays = {
  offset: number;
  days: dayjs.Dayjs[];
};

type WeekState = {
  weekDays: WeekDays[];
  activeIndex: number;
};

type WeekAction = {
  setActiveIndex: (index: number) => void;
  addNext: () => void;
  addPrev: () => void;
};

const getDefaultWeekDays = (): WeekDays[] => {
  return [
    { offset: -1, days: getWeekDays(-1) },
    { offset: 0, days: getWeekDays(0) },
    { offset: 1, days: getWeekDays(1) },
  ];
};

export const useWeekStore = create<WeekState & WeekAction>((set) => ({
  weekDays: getDefaultWeekDays(),
  activeIndex: 1,
  setActiveIndex: (index: number) => {
    set({ activeIndex: index });
  },
  addNext: () => {
    set((state) => ({
      weekDays: [
        ...state.weekDays,
        {
          offset: state.weekDays[state.weekDays.length - 1].offset + 1,
          days: getWeekDays(
            state.weekDays[state.weekDays.length - 1].offset + 1
          ),
        },
      ],
    }));
  },
  addPrev: () => {
    set((state) => ({
      weekDays: [
        {
          offset: state.weekDays[0].offset - 1,
          days: getWeekDays(state.weekDays[0].offset - 1),
        },
        ...state.weekDays,
      ],
    }));
  },
}));
