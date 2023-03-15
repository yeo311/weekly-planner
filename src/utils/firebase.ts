import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { addDoc, collection, getFirestore, onSnapshot, query, QuerySnapshot, Timestamp, where } from 'firebase/firestore';

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

export async function addTodo(uid: string, date: Date, subject: string) {
  const docRef = await addDoc(collection(db, uid), {
    subject,
    date: Timestamp.fromDate(date),
    isCompleted: false,
  })
  console.log("Document written with ID: ", docRef.id);
}

export function subscribeTodoData(uid: string, callBack: (querySnapShot: QuerySnapshot) => void) {
  const sDate = Timestamp.fromDate(new Date('2023-03-13'));
  const q = query(collection(db, uid), where("date", ">=", sDate));
  return onSnapshot(q, callBack);
}