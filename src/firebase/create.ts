import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { Task, RepetitiveTask } from '../types/task.types';
import { db } from './init';
import { toUnix } from '../utils/date';

function addSingleTask(uid: string, task: Task) {
  const { subject, date, color, repeatingType, sortIdx } = task;
  return addDoc(collection(db, uid), {
    subject,
    date: Timestamp.fromDate(date?.toDate()),
    isCompleted: false,
    color,
    repeatingType,
    sortIdx,
  });
}

function addRepetitiveTask(uid: string, task: RepetitiveTask) {
  const {
    startDate,
    endDate,
    repeatingType,
    repeatingNumber,
    subject,
    color,
    sortIdx,
  } = task;
  return addDoc(collection(db, `${uid}_repeat`), {
    startDate: Timestamp.fromDate(startDate.toDate()),
    endDate: endDate ? Timestamp.fromDate(endDate.toDate()) : null,
    repeatingType,
    repeatingNumber,
    subject,
    color,
    completedDates: [],
    deletedDates: [],
    sortIdxList: { [`${toUnix(startDate)}`]: sortIdx },
  });
}

// deprecated
export function addTodoItem(uid: string, task: Task | RepetitiveTask) {
  if (!task.isRepeated) {
    return addSingleTask(uid, task);
  } else {
    return addRepetitiveTask(uid, task);
  }
}

export function createTask(uid: string, task: Task | RepetitiveTask) {
  if (!task.isRepeated) {
    return addSingleTask(uid, task);
  } else {
    return addRepetitiveTask(uid, task);
  }
}
