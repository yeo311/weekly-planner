import { db } from '@/shared';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { TotalTask } from '../model/task';

const createSingleTask = (uid: string, task: TotalTask) => {
  const { subject, date, color, repeatingType, sortIdx } = task;
  return addDoc(collection(db, uid), {
    subject,
    date: Timestamp.fromDate(date?.toDate() ?? new Date()),
    isCompleted: false,
    color,
    repeatingType,
    sortIdx,
  });
};

const createRepetitiveTask = (uid: string, task: TotalTask) => {
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
    startDate: Timestamp.fromDate(startDate?.toDate() ?? new Date()),
    endDate: endDate ? Timestamp.fromDate(endDate?.toDate()) : null,
    repeatingType,
    repeatingNumber,
    subject,
    color,
    completedDates: [],
    deletedDates: [],
    sortIdxList: { [`${startDate?.toDate().getTime()}`]: sortIdx },
  });
};

export const createTaskItem = (uid: string, task: TotalTask) => {
  if (!task.repeatingType || task.repeatingType === 'single') {
    return createSingleTask(uid, task);
  } else {
    return createRepetitiveTask(uid, task);
  }
};
