import { db } from '@/shared';
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import { RepetitiveTaskDeleteTypes, TotalTask } from '../model/task';

export const deleteTaskItem = (uid: string, taskId: string) => {
  return deleteDoc(doc(db, uid, taskId));
};

export const deleteRepetitiveTaskItem = (
  uid: string,
  task: TotalTask,
  repetitiveTaskDeleteType: RepetitiveTaskDeleteTypes
) => {
  const ref = doc(db, `${uid}_repeat`, task.id ?? '');
  if (repetitiveTaskDeleteType === 'all') {
    return deleteDoc(ref);
  } else if (repetitiveTaskDeleteType === 'after') {
    const targetDate = new Date(
      Date.UTC(
        task.date?.year() ?? 0,
        task.date?.month() ?? 0,
        task.date?.date() ?? 0
      )
    );
    targetDate.setDate(targetDate.getDate() - 1);
    return updateDoc(ref, {
      endDate: Timestamp.fromDate(targetDate),
    });
  }
  const time = task.date?.valueOf() ?? 0;
  return updateDoc(ref, {
    completedDates: arrayRemove(time),
    deletedDates: arrayUnion(time),
  });
};
