import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  Timestamp,
  where,
} from 'firebase/firestore';
import { RepetitiveTask, Task } from '../types/task.types';
import { db } from './init';
import dayjs, { type Dayjs } from 'dayjs';

export async function getTasksByDateRange(
  uid: string,
  startDate: Dayjs,
  endDate: Dayjs
): Promise<Task[]> {
  const startTime = Timestamp.fromDate(startDate.toDate());
  const endTime = Timestamp.fromDate(endDate.toDate());
  const todoQuery = query(
    collection(db, uid),
    where('date', '>=', startTime),
    where('date', '<=', endTime)
  );
  const querySnapshot = await getDocs(todoQuery);
  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return { ...(data as Task), date: dayjs(data.date.toDate()), id: doc.id };
  });
}

export async function getRepetitiveTasksByDateRange(
  uid: string,
  startDate: Dayjs,
  endDate: Dayjs
): Promise<RepetitiveTask[]> {
  const startTime = Timestamp.fromDate(startDate.toDate());
  const endTime = Timestamp.fromDate(endDate.toDate());

  const repetitiveTodoQuery = query(
    collection(db, `${uid}_repeat`),
    where('endDate', '>=', startTime)
  );

  const querySnapshot = await getDocs(repetitiveTodoQuery);

  return querySnapshot.docs
    .map((doc) => {
      const data = doc.data();
      if (data.startDate.seconds < endTime.seconds) {
        return {
          ...(data as RepetitiveTask),
          startDate: dayjs(data.startDate.toDate()),
          endDate: dayjs(data.endDate.toDate()),
          id: doc.id,
        };
      }
    })
    .filter(Boolean) as RepetitiveTask[];
}

export async function getTodoById(uid: string, id: string): Promise<Task> {
  const docSnap = await getDoc(doc(db, uid, id));
  if (!docSnap.exists()) throw Error('todo not exists');
  const data = docSnap.data();

  return {
    ...(data as Task),
    date: data.date.toDate(),
    id: docSnap.id,
  };
}

export async function getRepetitiveTodoById(
  uid: string,
  id: string
): Promise<RepetitiveTask> {
  const docSnap = await getDoc(doc(db, `${uid}_repeat`, id));
  if (!docSnap.exists()) throw Error('todo not exists');
  const data = docSnap.data();
  return {
    ...(data as RepetitiveTask),
    startDate: data.startDate.toDate(),
    endDate: data.endDate.toDate(),
    id: docSnap.id,
  };
}
