import { atom } from 'recoil';

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
