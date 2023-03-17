import { atom, selector } from 'recoil';
import { thisWeekState } from './thisWeekState';
import { Todo } from '../types/todo';

export interface TodoByDate {
  date: Date;
  list: Todo[];
}

export const todoListState = atom<Todo[]>({
  key: 'todoListState',
  default: [],
});

export const todoListsByDateState = selector({
  key: 'todoListsByDate',
  get: ({ get }) => {
    const list = get(todoListState);
    const thisWeek = get(thisWeekState);

    return thisWeek.map((date) => {
      return {
        date,
        list: list.filter((todo) => {
          return todo.date.getTime() === date.getTime();
        }),
      };
    });
  },
});
