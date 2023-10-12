import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { TotalTodo } from '../types/todo';
import { db } from './init';

function addSingleTodo(uid: string, todo: TotalTodo) {
  const { subject, date, color, repeatingType, sortIdx } = todo;
  return addDoc(collection(db, uid), {
    subject,
    date: Timestamp.fromDate(date as Date),
    isCompleted: false,
    color,
    repeatingType,
    sortIdx,
  });
}

function addRepetitiveTodo(uid: string, todo: TotalTodo) {
  const {
    startDate,
    endDate,
    repeatingType,
    repeatingNumber,
    subject,
    color,
    sortIdx,
  } = todo;
  return addDoc(collection(db, `${uid}_repeat`), {
    startDate: Timestamp.fromDate(startDate as Date),
    endDate: endDate ? Timestamp.fromDate(endDate as Date) : null,
    repeatingType,
    repeatingNumber,
    subject,
    color,
    completedDates: [],
    deletedDates: [],
    sortIdxList: { [`${(startDate as Date).getTime()}`]: sortIdx },
  });
}

export function addTodoItem(uid: string, todo: TotalTodo) {
  if (!todo.repeatingType || todo.repeatingType === 'single') {
    return addSingleTodo(uid, todo);
  } else {
    return addRepetitiveTodo(uid, todo);
  }
}
