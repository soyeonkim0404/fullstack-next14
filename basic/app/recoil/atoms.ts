import { atom } from 'recoil';

export const userState = atom<{
  email: string;
  name: string;
}>({
  key: 'userState',
  default: {
    email: null,
    name: null
  }
});
