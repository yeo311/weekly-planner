import { atom } from 'recoil';
import { Todo } from '../types/todo';

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

interface DeleteDialogState {
  isOpen: boolean;
  targetTodo: Todo | null;
}

export const deleteDialogState = atom<DeleteDialogState>({
  key: 'deleteDialogState',
  default: {
    isOpen: false,
    targetTodo: null,
  },
});
