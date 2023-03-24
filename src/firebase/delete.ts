import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import { RepetitiveTodoDeleteTypes, Todo } from '../types/todo';
import { db } from './init';

export function deleteFirebaseTodo(uid: string, todoId: string) {
  return deleteDoc(doc(db, uid, todoId));
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
