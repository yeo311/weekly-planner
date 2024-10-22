import { db } from '@/shared';
import { Dayjs } from 'dayjs';
import { doc, getDoc } from 'firebase/firestore';
import { Memo } from '../model/memo';

export const getMemo = async (uid: string, date: Dayjs) => {
  const docRef = doc(db, `${uid}_memo`, date.format('YYYY-MM-DD'));
  const docSnap = await getDoc(docRef);
  return (docSnap.data() as Memo) ?? null;
};
