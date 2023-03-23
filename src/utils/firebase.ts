import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import {
  RepeatingTypes,
  RepetitiveTodoDeleteTypes,
  Todo,
  TodoColors,
} from '../types/todo';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export function addFirebaseTodo(
  uid: string,
  date: Date,
  subject: string,
  color: TodoColors
) {
  return addDoc(collection(db, uid), {
    subject,
    date: Timestamp.fromDate(date),
    isCompleted: false,
    color,
  });
}

export function updateFirebaseTodoItem(
  uid: string,
  todoId: string,
  isCompleted: boolean
) {
  return updateDoc(doc(db, uid, todoId), {
    isCompleted,
  });
}

export function getFireBaseTodosByDate(uid: string, date: Date) {
  return getDocs(
    query(collection(db, uid), where('date', '==', Timestamp.fromDate(date)))
  );
}

export function deleteFirebaseTodo(uid: string, todoId: string) {
  return deleteDoc(doc(db, uid, todoId));
}

export function addFirebaseRepetitiveTodo(
  uid: string,
  startDate: Date,
  endDate: Date,
  repeatingType: RepeatingTypes,
  repeatingNumber: number | null,
  subject: string,
  color: TodoColors
) {
  return addDoc(collection(db, `${uid}_repeat`), {
    startDate: Timestamp.fromDate(startDate),
    endDate: endDate ? Timestamp.fromDate(endDate) : null,
    repeatingType,
    repeatingNumber,
    subject,
    color,
    completedDates: [],
    deletedDates: [],
  });
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

export function updateFirebaseRepetitiveTodosIsCompleted(
  uid: string,
  todoId: string,
  isCompleted: boolean,
  date: Date
) {
  const time = date.getTime();
  return updateDoc(doc(db, `${uid}_repeat`, todoId), {
    completedDates: isCompleted ? arrayUnion(time) : arrayRemove(time),
  });
}

export function deleteFirebaseRepetitiveTodo(
  uid: string,
  todo: Todo,
  repetitiveTodoDeleteType: RepetitiveTodoDeleteTypes
) {
  const ref = doc(db, `${uid}_repeat`, todo.id);
  if (repetitiveTodoDeleteType === 'all') {
    return deleteDoc(ref);
  } else if (repetitiveTodoDeleteType === 'after') {
    const targetDate = new Date(
      Date.UTC(
        todo.date.getFullYear(),
        todo.date.getMonth(),
        todo.date.getDate()
      )
    );
    targetDate.setDate(targetDate.getDate() - 1);
    return updateDoc(ref, {
      endDate: Timestamp.fromDate(targetDate),
    });
  }
  const time = todo.date.getTime();
  return updateDoc(ref, {
    completedDates: arrayRemove(time),
    deletedDates: arrayUnion(time),
  });
}
