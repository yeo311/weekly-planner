import { db } from '@/shared';
import {
  Timestamp,
  getDocs,
  query,
  collection,
  where,
  doc,
  getDoc,
} from 'firebase/firestore';
import { RepetitiveTask, Task } from '../model/task';
import dayjs from 'dayjs';

export const getTasksByDateRange = async (
  uid: string,
  startDate: Date,
  endDate: Date
) => {
  const startTime = Timestamp.fromDate(startDate);
  const endTime = Timestamp.fromDate(endDate);
  const querySnapshot = await getDocs(
    query(
      collection(db, uid),
      where('date', '>=', startTime),
      where('date', '<=', endTime)
    )
  );
  const result: Task[] = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    result.push({
      ...(data as Task),
      date: dayjs(data.date.toDate()),
      id: doc.id,
    });
  });
  return result;
};

export const getRepetitiveTasksByDateRange = async (
  uid: string,
  startDate: Date,
  endDate: Date
) => {
  const startTime = Timestamp.fromDate(startDate);
  const endTime = Timestamp.fromDate(endDate);

  const querySnapshot = await getDocs(
    query(collection(db, `${uid}_repeat`), where('endDate', '>=', startTime))
  );
  const result: RepetitiveTask[] = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    if (data.startDate.seconds < endTime.seconds) {
      result.push({
        ...(data as RepetitiveTask),
        startDate: dayjs(data.startDate.toDate()),
        endDate: dayjs(data.endDate.toDate()),
        id: doc.id,
      });
    }
  });
  return result;
};

export const getTaskById = async (uid: string, id: string) => {
  const docSnap = await getDoc(doc(db, uid, id));
  if (!docSnap.exists()) throw Error('task not exists');
  const data = docSnap.data();
  return {
    ...(data as Task),
    date: dayjs(data.date.toDate()),
    id: docSnap.id,
  };
};

export const getRepetitiveTaskById = async (uid: string, id: string) => {
  const docSnap = await getDoc(doc(db, `${uid}_repeat`, id));
  if (!docSnap.exists()) throw Error('task not exists');
  const data = docSnap.data();
  return {
    ...(data as RepetitiveTask),
    startDate: dayjs(data.startDate.toDate()),
    endDate: dayjs(data.endDate.toDate()),
    id: docSnap.id,
  };
};
