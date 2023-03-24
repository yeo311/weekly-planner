import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { TotalTodo } from '../types/todo';
import { db } from './init';

export function updateFirebaseTodoItem(
  uid: string,
  todoId: string,
  isCompleted: boolean
) {
  return updateDoc(doc(db, uid, todoId), {
    isCompleted,
  });
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

export function updateTodoItem(uid: string, todo: TotalTodo) {
  const collectionName =
    todo.repeatingType === 'single' ? uid : `${uid}_repeat`;
  return updateDoc(doc(db, collectionName, todo.id as string), {
    subject: todo.subject,
    color: todo.color,
  });
}
