import { atom } from 'recoil';
import { Todo } from '../types/todo';

export const todoListState = atom<Record<number, Todo[]>>({
  key: 'todoListState',
  default: {},
});
