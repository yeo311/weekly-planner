import { db } from '@/shared';
import { Dayjs } from 'dayjs';
import { doc, setDoc } from 'firebase/firestore';

export const createMemo = (uid: string, date: Dayjs, memo: string) => {
  try {
    return setDoc(doc(db, `${uid}_memo`, date.format('YYYY-MM-DD')), {
      memo,
    });
  } catch (error) {
    console.error(error);
  }
};
