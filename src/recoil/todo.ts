import { atom } from 'recoil';
import { Task } from '../types/todo';

export const todoListState = atom<Record<number, Task[]>>({
  key: 'todoListState',
  default: {},
});
