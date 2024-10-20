import { db } from '@/shared';
import {
  updateDoc,
  doc,
  arrayRemove,
  arrayUnion,
  Timestamp,
} from 'firebase/firestore';
import { RepeatingTypes, TotalTask } from '../model/task';
import { Dayjs } from 'dayjs';

export const updateSingleTaskItemIsCompleted = (
  uid: string,
  taskId: string,
  isCompleted: boolean,
  sortIdx?: number
) => {
  return updateDoc(doc(db, uid, taskId), {
    isCompleted,
    ...(sortIdx !== undefined && { sortIdx }),
  });
};

export const updateRepetitiveTaskItemIsCompleted = (
  uid: string,
  taskId: string,
  isCompleted: boolean,
  date: Dayjs,
  sortIdx?: number
) => {
  const time = date.valueOf();
  return updateDoc(doc(db, `${uid}_repeat`, taskId), {
    completedDates: isCompleted ? arrayUnion(time) : arrayRemove(time),
    ...(sortIdx !== undefined && { [`sortIdxList.${time}`]: sortIdx }),
  });
};

export const updateTaskItemIsCompleted = ({
  uid,
  taskId,
  isCompleted,
  repeatingType,
  date,
  sortIdx,
}: {
  uid: string;
  taskId: string;
  isCompleted: boolean;
  repeatingType: RepeatingTypes;
  date: Dayjs;
  sortIdx?: number;
}) => {
  if (!repeatingType || repeatingType === 'single') {
    return updateSingleTaskItemIsCompleted(uid, taskId, isCompleted, sortIdx);
  }
  return updateRepetitiveTaskItemIsCompleted(
    uid,
    taskId,
    isCompleted,
    date,
    sortIdx
  );
};

export const updateTaskItem = (uid: string, task: TotalTask) => {
  const isSingleType = !task.repeatingType || task.repeatingType === 'single';
  const collectionName = isSingleType ? uid : `${uid}_repeat`;
  return updateDoc(doc(db, collectionName, task.id as string), {
    subject: task.subject,
    color: task.color,
    ...(isSingleType && {
      date: Timestamp.fromDate(task.date?.toDate() ?? new Date()),
    }),
  });
};
