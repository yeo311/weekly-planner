import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { TotalTodo } from '../types/todo';
import { db } from './init';

function addSingleTodo(uid: string, todo: TotalTodo) {
  const { subject, date, color } = todo;
  return addDoc(collection(db, uid), {
    subject,
    date: Timestamp.fromDate(date as Date),
    isCompleted: false,
    color,
  });
}

function addRepetitiveTodo(uid: string, todo: TotalTodo) {
  const { startDate, endDate, repeatingType, repeatingNumber, subject, color } =
    todo;
  return addDoc(collection(db, `${uid}_repeat`), {
    startDate: Timestamp.fromDate(startDate as Date),
    endDate: endDate ? Timestamp.fromDate(endDate as Date) : null,
    repeatingType,
    repeatingNumber,
    subject,
    color,
    completedDates: [],
    deletedDates: [],
  });
}

export function addTodoItem(uid: string, todo: TotalTodo) {
  if (todo.repeatingType === 'single') {
    addSingleTodo(uid, todo);
  } else {
    addRepetitiveTodo(uid, todo);
  }
}
