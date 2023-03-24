import {
  collection,
  getDocs,
  query,
  Timestamp,
  where,
} from 'firebase/firestore';
import { db } from './init';

export function getFireBaseTodosByDate(uid: string, date: Date) {
  return getDocs(
    query(collection(db, uid), where('date', '==', Timestamp.fromDate(date)))
  );
}

export function getFirebaseRepetitiveTodosByDate(uid: string, date: Date) {
  const dateToTimestamp = Timestamp.fromDate(date);
  return getDocs(
    query(
      collection(db, `${uid}_repeat`),
      where('endDate', '>=', dateToTimestamp)
    )
  );
}
