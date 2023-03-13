import { atom } from 'recoil';

interface LoginStatus {
  isLogin: boolean;
  uid: string;
}

export const loginState = atom<LoginStatus>({
  key: 'loginState',
  default: {
    isLogin: false,
    uid: '',
  },
});
