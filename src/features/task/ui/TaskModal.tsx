import {
  createTaskItem,
  deleteRepetitiveTaskItem,
  deleteTaskItem,
  RepetitiveTaskDeleteTypes,
  TaskColors,
  TotalTask,
  updateTaskItem,
} from '@/entities/tasks';
import { Button, DatePicker, Form, Input, Modal, Radio, Select } from 'antd';
import styled from 'styled-components';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs, { Dayjs } from 'dayjs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userState } from '@/shared';
import { useAtomValue } from 'jotai';
import { GET_TASKS_QUERY_KEY } from '../hooks/useGetTasks';
import { useEffect, useState } from 'react';

const addTaskSchema = z.object({
  subject: z
    .string({ message: '할일을 입력해주세요.' })
    .min(1, '할일을 입력해주세요.'),
  color: z.nativeEnum(TaskColors, {
    message: '색상을 선택해주세요.',
  }),
  repeat: z.enum(['single', 'weekly', 'daily', 'weekdays', 'monthly'], {
    message: '반복 옵션을 선택해주세요.',
  }),
  currentDate: z.custom<Dayjs | undefined>(
    (val) => val?.$isDayjsObject,
    'invalid date'
  ),
  endDate: z
    .custom<Dayjs | undefined>((val) => val?.$isDayjsObject, 'invalid date')
    .optional(),
});

type AddTaskForm = z.infer<typeof addTaskSchema>;

type TaskModalProps = {
  open: boolean;
  onCancel: () => void;
  date: Dayjs;
  sortIdx: number;
  selectedTask?: TotalTask;
};

export const TaskModal = ({
  open,
  onCancel,
  date,
  sortIdx,
  selectedTask,
}: TaskModalProps) => {
  const { control, handleSubmit, reset, watch } = useForm<AddTaskForm>({
    resolver: zodResolver(addTaskSchema),
    defaultValues: {
      repeat: 'single',
      color: TaskColors.Green,
      currentDate: date,
    },
  });
  const [repetitiveTodoDeleteType, setRepetitiveTodoDeleteType] =
    useState<RepetitiveTaskDeleteTypes>('only');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const uid = useAtomValue(userState);
  const queryClient = useQueryClient();
  const repeatValue = watch('repeat');
  const currentDateValue = watch('currentDate');

  const { mutate: createTask, isPending } = useMutation({
    mutationFn: (task: TotalTask) => createTaskItem(uid, task),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:
          repeatValue !== 'single'
            ? [GET_TASKS_QUERY_KEY, uid]
            : [GET_TASKS_QUERY_KEY, uid, date.toISOString()],
      });

      onClose();
    },
  });

  const { mutate: updateTask, isPending: isUpdating } = useMutation({
    mutationFn: (task: TotalTask) => updateTaskItem(uid, task),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GET_TASKS_QUERY_KEY, uid, date.toISOString()],
      });
      if (currentDateValue?.valueOf() !== date.valueOf()) {
        queryClient.invalidateQueries({
          queryKey: [GET_TASKS_QUERY_KEY, uid, currentDateValue?.toISOString()],
        });
      }
      onClose();
    },
  });

  const { mutate: deleteTask, isPending: isDeleting } = useMutation({
    mutationFn: (task: TotalTask) => deleteTaskItem(uid, task.id ?? ''),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GET_TASKS_QUERY_KEY, uid, date.toISOString()],
      });
      setDeleteModalOpen(false);
      onClose();
    },
  });

  const { mutate: deleteRepetitiveTask, isPending: isDeletingRepetitiveTask } =
    useMutation({
      mutationFn: ({
        task,
        repetitiveTodoDeleteType,
      }: {
        task: TotalTask;
        repetitiveTodoDeleteType: RepetitiveTaskDeleteTypes;
      }) => deleteRepetitiveTaskItem(uid, task, repetitiveTodoDeleteType),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [GET_TASKS_QUERY_KEY, uid],
        });
        setDeleteModalOpen(false);
        onClose();
      },
    });

  useEffect(() => {
    if (selectedTask) {
      reset({
        subject: selectedTask.subject,
        color: selectedTask.color,
        repeat: selectedTask.repeatingType,
        endDate: selectedTask.endDate,
        currentDate: date,
      });
    }
  }, [date, reset, selectedTask]);

  const onSubmit = (data: AddTaskForm) => {
    if (!selectedTask) {
      createTask({
        date,
        sortIdx,
        subject: data.subject,
        color: data.color,
        startDate: date,
        endDate:
          data.repeat !== 'single' && data.endDate
            ? data.endDate
            : dayjs('2099-12-31'),
        repeatingType: data.repeat,
        repeatingNumber:
          data.repeat === 'monthly'
            ? date.date()
            : data.repeat === 'weekly'
            ? date.day()
            : 0,
      });
    } else {
      updateTask({
        ...selectedTask,
        subject: data.subject,
        color: data.color,
        date: data.currentDate,
      });
    }
  };

  const onClose = () => {
    reset({
      subject: '',
      color: TaskColors.Green,
      repeat: 'single',
      endDate: undefined,
      currentDate: date,
    });
    onCancel();
  };

  const handleDeleteOk = () => {
    console.log('삭제', repetitiveTodoDeleteType);
    if (!selectedTask) return;
    if (
      !selectedTask.repeatingType ||
      selectedTask.repeatingType === 'single'
    ) {
      deleteTask(selectedTask);
    } else {
      deleteRepetitiveTask({
        task: selectedTask,
        repetitiveTodoDeleteType,
      });
    }
  };

  const handleDelete = () => {
    if (!selectedTask) return;
    setDeleteModalOpen(true);
  };

  return (
    <>
      <Modal
        open={open}
        title={selectedTask ? '할일 수정' : '할일 추가'}
        onCancel={onClose}
        destroyOnClose
        footer={() => (
          <>
            <Button onClick={onClose}>취소</Button>
            {selectedTask && (
              <Button danger onClick={handleDelete}>
                삭제
              </Button>
            )}
            <Button
              type="primary"
              onClick={handleSubmit(onSubmit)}
              loading={isPending || isUpdating}
            >
              {selectedTask ? '수정' : '추가'}
            </Button>
          </>
        )}
      >
        <FormContainer>
          <Form initialValues={{ repeat: 'single', color: TaskColors.Green }}>
            <Controller
              control={control}
              name="subject"
              render={({ field, formState: { errors } }) => (
                <Form.Item
                  label="할일"
                  name="subject"
                  validateStatus={errors.subject ? 'error' : undefined}
                  help={errors.subject?.message}
                >
                  <Input
                    {...field}
                    defaultValue={selectedTask?.subject ?? ''}
                  />
                </Form.Item>
              )}
            />
            <Controller
              control={control}
              name="color"
              render={({ field, formState: { errors } }) => (
                <Form.Item
                  label="색상"
                  name="color"
                  validateStatus={errors.color ? 'error' : undefined}
                  help={errors.color?.message}
                >
                  <Select
                    {...field}
                    defaultValue={selectedTask?.color}
                    options={Object.entries(TaskColors).map(([key, value]) => ({
                      label: <ColorItem color={value}>{key}</ColorItem>,
                      value: value,
                    }))}
                  />
                </Form.Item>
              )}
            />
            <Controller
              control={control}
              name="repeat"
              render={({ field, formState: { errors } }) => (
                <Form.Item
                  label="반복"
                  name="repeat"
                  validateStatus={errors.repeat ? 'error' : undefined}
                  help={errors.repeat?.message}
                  style={{ display: selectedTask ? 'none' : 'block' }}
                >
                  <Select
                    {...field}
                    defaultValue={selectedTask?.repeatingType}
                    options={[
                      { label: '반복 안함', value: 'single' },
                      { label: '매일', value: 'daily' },
                      { label: '매주', value: 'weekly' },
                      { label: '매월', value: 'monthly' },
                      { label: '주중 매일', value: 'weekdays' },
                    ]}
                  />
                </Form.Item>
              )}
            />
            <Controller
              control={control}
              name="currentDate"
              render={({ field, formState: { errors } }) => (
                <Form.Item
                  label="날짜"
                  validateStatus={errors.currentDate ? 'error' : undefined}
                  help={errors.currentDate?.message}
                  style={{
                    display:
                      selectedTask && repeatValue === 'single'
                        ? 'block'
                        : 'none',
                  }}
                >
                  <DatePicker {...field} />
                </Form.Item>
              )}
            />
            <Controller
              control={control}
              name="endDate"
              render={({ field, formState: { errors } }) => (
                <Form.Item
                  label="종료일 (선택하지 않으면 계속 반복)"
                  validateStatus={errors.endDate ? 'error' : undefined}
                  help={errors.endDate?.message}
                  style={{
                    display:
                      repeatValue !== 'single' && !selectedTask
                        ? 'block'
                        : 'none',
                  }}
                >
                  <DatePicker {...field} />
                </Form.Item>
              )}
            />
          </Form>
        </FormContainer>
      </Modal>
      <Modal
        open={deleteModalOpen}
        onCancel={() => setDeleteModalOpen(false)}
        onOk={handleDeleteOk}
        zIndex={1001}
        title="정말 삭제하시겠습니까?"
        okButtonProps={{ loading: isDeleting || isDeletingRepetitiveTask }}
      >
        {selectedTask?.repeatingType !== 'single' ? (
          <FormContainer>
            <Radio.Group
              value={repetitiveTodoDeleteType}
              onChange={(e) => {
                setRepetitiveTodoDeleteType(e.target.value);
              }}
            >
              <Radio value="all">모든 할일</Radio>
              <Radio value="after">이번 및 향후 할일</Radio>
              <Radio value="only">이 할일만</Radio>
            </Radio.Group>
          </FormContainer>
        ) : null}
      </Modal>
    </>
  );
};

const ColorItem = styled.span<{ color: string }>`
  background: linear-gradient(transparent, 70%, ${({ color }) => color} 30%);
`;

const FormContainer = styled.div`
  padding-top: 24px;
`;
