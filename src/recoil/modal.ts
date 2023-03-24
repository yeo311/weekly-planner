import { atom } from 'recoil';
import { Todo } from '../types/todo';

export type DialogTypes = 'info' | 'delete' | 'edit';

interface AddModalState {
  isShowModal: boolean;
  targetDate: Date;
}

export const addModalState = atom<AddModalState>({
  key: 'addModalState',
  default: {
    isShowModal: false,
    targetDate: new Date(),
  },
});

interface DialogState {
  isOpen: boolean;
  type: DialogTypes;
  targetTodo: Todo | null;
}

export const dialogState = atom<DialogState>({
  key: 'DialogState',
  default: {
    isOpen: false,
    targetTodo: null,
    type: 'info',
  },
});
