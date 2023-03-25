import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  Timestamp,
  where,
} from 'firebase/firestore';
import { RepetitiveTodo, Todo } from '../types/todo';
import { db } from './init';

export async function getTodosByDateRange(
  uid: string,
  startDate: Date,
  endDate: Date
) {
  const startTime = Timestamp.fromDate(startDate);
  const endTime = Timestamp.fromDate(endDate);
  const querySnapshot = await getDocs(
    query(
      collection(db, uid),
      where('date', '>=', startTime),
      where('date', '<=', endTime)
    )
  );
  const result: Todo[] = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    result.push({ ...(data as Todo), date: data.date.toDate(), id: doc.id });
  });
  return result;
}

export async function getRepetitiveTodosByDateRange(
  uid: string,
  startDate: Date,
  endDate: Date
) {
  const startTime = Timestamp.fromDate(startDate);
  const endTime = Timestamp.fromDate(endDate);

  const querySnapshot = await getDocs(
    query(collection(db, `${uid}_repeat`), where('endDate', '>=', startTime))
  );

  const result: RepetitiveTodo[] = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    if (data.startDate.seconds < endTime.seconds) {
      result.push({
        ...(data as RepetitiveTodo),
        startDate: data.startDate.toDate(),
        endDate: data.endDate.toDate(),
        id: doc.id,
      });
    }
  });
  return result;
}

export async function getTodoById(uid: string, id: string): Promise<Todo> {
  const docSnap = await getDoc(doc(db, uid, id));
  if (!docSnap.exists()) throw Error('todo not exists');
  const data = docSnap.data();

  return {
    ...(data as Todo),
    date: data.date.toDate(),
    id: docSnap.id,
  };
}

export async function getRepetitiveTodoById(
  uid: string,
  id: string
): Promise<RepetitiveTodo> {
  const docSnap = await getDoc(doc(db, `${uid}_repeat`, id));
  if (!docSnap.exists()) throw Error('todo not exists');
  const data = docSnap.data();
  return {
    ...(data as RepetitiveTodo),
    startDate: data.startDate.toDate(),
    endDate: data.endDate.toDate(),
    id: docSnap.id,
  };
}
