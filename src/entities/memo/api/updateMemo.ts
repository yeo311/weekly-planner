import { db } from '@/shared';
import { Dayjs } from 'dayjs';
import { updateDoc, doc } from 'firebase/firestore';

export const updateMemo = (uid: string, date: Dayjs, memo: string) => {
  try {
    return updateDoc(doc(db, `${uid}_memo`, date.format('YYYY-MM-DD')), {
      memo,
    });
  } catch (error) {
    console.error(error);
  }
};
