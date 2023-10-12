import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { TotalTodo } from '../types/todo';
import { db } from './init';

export function updateFirebaseTodoItem(
  uid: string,
  todoId: string,
  isCompleted: boolean,
  sortIdx?: number
) {
  return updateDoc(doc(db, uid, todoId), {
    isCompleted,
    ...(sortIdx && { sortIdx }),
  });
}

export function updateFirebaseRepetitiveTodosIsCompleted(
  uid: string,
  todoId: string,
  isCompleted: boolean,
  date: Date,
  sortIdx?: number
) {
  const time = date.getTime();
  return updateDoc(doc(db, `${uid}_repeat`, todoId), {
    completedDates: isCompleted ? arrayUnion(time) : arrayRemove(time),
    ...(sortIdx && { [`sortIdxList.${time}`]: sortIdx }),
  });
}

export function updateTodoItem(uid: string, todo: TotalTodo) {
  const isSingleType = !todo.repeatingType || todo.repeatingType === 'single';
  const collectionName = isSingleType ? uid : `${uid}_repeat`;
  return updateDoc(doc(db, collectionName, todo.id as string), {
    subject: todo.subject,
    color: todo.color,
    ...(isSingleType && { date: todo.date }), // single type 투두의 경우에만 date를 업데이트
  });
}
