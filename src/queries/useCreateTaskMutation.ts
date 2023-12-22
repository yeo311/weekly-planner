import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { createTask } from '../firebase/create';
import { RepetitiveTask, Task } from '../types/task.types';
import { DocumentData, DocumentReference } from 'firebase/firestore';

const useCreateTaskMutation = (
  uid: string,
  task: Task | RepetitiveTask,
  options: Omit<
    UseMutationOptions<DocumentReference<DocumentData>>,
    'mutationKey' | 'mutationFn'
  >
) => {
  return useMutation({
    mutationKey: ['create-task', uid, task],
    mutationFn: () => createTask(uid, task),
    ...options,
  });
};

export default useCreateTaskMutation;
