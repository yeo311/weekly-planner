import dayjs, { Dayjs } from 'dayjs';
import { GET_TASKS_QUERY_KEY, useGetTasks } from '../hooks/useGetTasks';
import styled, { css } from 'styled-components';
import { Button, Checkbox, Table } from 'antd';
import { getWeekdayFormat } from '@/entities/tasks/model/weekday';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TaskModal } from './TaskModal';
import { useState } from 'react';
import {
  TaskColors,
  TotalTask,
  updateTaskItemIsCompleted,
} from '@/entities/tasks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userState } from '@/shared';
import { useAtomValue } from 'jotai';
import { PlusOutlined } from '@ant-design/icons';

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  'data-row-key': string;
}

const Row = (props: RowProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props['data-row-key'],
  });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Translate.toString(transform),
    transition,
    cursor: 'pointer',
    touchAction: 'none',
    ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
  };

  return (
    <tr
      {...props}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    />
  );
};

export const TaskList = ({ date }: { date: Dayjs }) => {
  const { data, isLoading } = useGetTasks(date);
  const [openAddTaskModal, setOpenAddTaskModal] = useState(false);
  const uid = useAtomValue(userState);
  const queryClient = useQueryClient();
  const [selectedTask, setSelectedTask] = useState<TotalTask | undefined>(
    undefined
  );
  const { mutate: updateTask } = useMutation({
    mutationFn: (task: TotalTask) =>
      updateTaskItemIsCompleted({
        uid,
        taskId: task.id ?? '',
        isCompleted: task.isCompleted ?? false,
        repeatingType: task.repeatingType ?? 'single',
        date,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GET_TASKS_QUERY_KEY, uid, date.toISOString()],
      });
    },
  });

  const { mutate: updateTasks } = useMutation({
    mutationFn: (tasks: TotalTask[]) => {
      const promises: Promise<void>[] = [];
      tasks.forEach((task, idx) => {
        promises.push(
          updateTaskItemIsCompleted({
            uid,
            taskId: task.id ?? '',
            isCompleted: task.isCompleted ?? false,
            repeatingType: task.repeatingType ?? 'single',
            date,
            sortIdx: idx,
          })
        );
      });
      return Promise.all(promises);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GET_TASKS_QUERY_KEY, uid, date.toISOString()],
      });
    },
  });

  const handleCheckboxChange = (task: TotalTask, isCompleted: boolean) => {
    queryClient.setQueryData(
      [GET_TASKS_QUERY_KEY, uid, date.toISOString()],
      (prev: TotalTask[]) => {
        return prev.map((t) => (t.id === task.id ? { ...t, isCompleted } : t));
      }
    );
    updateTask({ ...task, isCompleted });
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        // https://docs.dndkit.com/api-documentation/sensors/pointer#activation-constraints
        distance: 1,
      },
    })
  );

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id && data) {
      const activeIndex = data?.findIndex((task) => task.id === active.id);
      const overIndex = data?.findIndex((task) => task.id === over?.id);
      if (activeIndex !== undefined && overIndex !== undefined) {
        const newData = arrayMove(data, activeIndex, overIndex);
        queryClient.setQueryData(
          [GET_TASKS_QUERY_KEY, uid, date.toISOString()],
          newData
        );
        updateTasks(newData);
      }
    }
  };

  const isToday = date.isSame(dayjs(), 'day');
  const isSunday = date.day() === 0;
  const isSaturday = date.day() === 6;
  const titleColor = isSunday
    ? '#ff2424cf'
    : isSaturday
    ? '#2d2dffcc'
    : undefined;

  return (
    <>
      <Container>
        <DndContext
          sensors={sensors}
          modifiers={[restrictToVerticalAxis]}
          onDragEnd={onDragEnd}
        >
          <SortableContext
            items={data?.map((task) => task.id) ?? []}
            strategy={verticalListSortingStrategy}
          >
            <ListTable
              dataSource={data}
              rowKey="id"
              components={{
                body: {
                  row: data?.length ? Row : undefined,
                },
              }}
              titleColor={titleColor}
              titleHighlight={isToday}
              columns={[
                {
                  title: `${date.format('MM/DD')} (${getWeekdayFormat(date)})`,
                  dataIndex: 'subject',
                  render: (_, record) => {
                    return (
                      <Item>
                        <ColorfulCheckbox
                          color={record.color}
                          checked={record.isCompleted}
                          onChange={(e) => {
                            handleCheckboxChange(record, e.target.checked);
                          }}
                        />
                        <ItemClickableArea
                          checked={record.isCompleted}
                          onClick={() => {
                            setSelectedTask(record);
                            setOpenAddTaskModal(true);
                          }}
                        >
                          <span>{record.subject}</span>
                        </ItemClickableArea>
                      </Item>
                    );
                  },
                },
              ]}
              pagination={false}
              loading={isLoading}
              locale={{ emptyText: '할일이 엄서용~🥳' }}
              footer={() => (
                <Button
                  onClick={() => setOpenAddTaskModal(true)}
                  style={{ width: '100%' }}
                >
                  <PlusOutlined />
                </Button>
              )}
            />
          </SortableContext>
        </DndContext>
      </Container>
      <TaskModal
        open={openAddTaskModal}
        onCancel={() => {
          setSelectedTask(undefined);
          setOpenAddTaskModal(false);
        }}
        date={date}
        sortIdx={data?.length ?? 0}
        selectedTask={selectedTask}
      />
    </>
  );
};

const Container = styled.div`
  width: 100%;
  touch-action: none;
`;

const ListTable = styled(Table<TotalTask>)<{
  titleColor?: string;
  titleHighlight?: boolean;
}>`
  .ant-table-footer {
    background: transparent;
  }
  .ant-table-thead > tr > th {
    text-align: center;
    color: ${({ titleColor }) => titleColor ?? 'inherit'};
  }
  ${({ titleHighlight }) =>
    titleHighlight &&
    css`
      .ant-table-thead > tr > th::after {
        content: '';
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 60px;
        height: 6px;
        bottom: 30%;
        background-color: #feff00a6;
      }
    `}
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ItemClickableArea = styled.div<{ checked?: boolean }>`
  flex: 1;
  ${({ checked }) =>
    checked &&
    css`
      color: rgba(0, 0, 0, 0.25);
    `}
`;

const ColorfulCheckbox = styled(Checkbox)<{
  color?: TaskColors;
  checked?: boolean;
}>`
  .ant-checkbox-inner {
    background-color: ${({ color, checked }) =>
      !checked ? color : 'lightgray'} !important;
    border-color: ${({ color, checked }) =>
      !checked ? color : 'lightgray'} !important;
  }
`;
