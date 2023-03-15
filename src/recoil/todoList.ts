import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export interface Todo {
  id: string;
  date: Timestamp;
  subject: string;
  isCompleted: boolean;
}

export const todoListState = atom<Todo[]>({
  key: 'todoListState',
  default: [],
});