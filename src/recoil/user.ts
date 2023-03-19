import { atom } from 'recoil';

interface UserData {
  isLogin: boolean;
  uid: string;
}

export const userState = atom<UserData>({
  key: 'userState',
  default: {
    isLogin: false,
    uid: '',
  },
});
