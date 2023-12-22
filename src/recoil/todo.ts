import { atom } from 'recoil';
import { Task } from '../types/task.types';

export const todoListState = atom<Record<number, Task[]>>({
  key: 'todoListState',
  default: {},
});
