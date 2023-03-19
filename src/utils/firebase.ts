import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore';

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

export function addTodo(uid: string, date: Date, subject: string) {
  return addDoc(collection(db, uid), {
    subject,
    date: Timestamp.fromDate(date),
    isCompleted: false,
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
