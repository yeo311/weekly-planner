import { Dayjs } from 'dayjs';

export type RepeatingTypes =
  | 'single'
  | 'weekly'
  | 'daily'
  | 'weekdays'
  | 'monthly';

export enum TaskColors {
  Green = '#d5eecf',
  Yellow = '#f8f7af',
  Orange = '#ffcba3',
  Red = '#ffa4a4',
  Violet = '#ebccff',
  Blue = '#cce9ff',
}

export type RepetitiveTaskDeleteTypes = 'only' | 'after' | 'all';

export interface Task {
  id: string;
  date: Dayjs;
  subject: string;
  isCompleted: boolean;
  isRepeated?: false;
  repeatingType: RepeatingTypes;
  color: TaskColors;
  sortIdx: number;
}

export interface RepetitiveTask {
  id: string;
  subject: string;
  startDate: Dayjs;
  isRepeated: true;
  endDate: Dayjs;
  repeatingType: RepeatingTypes;
  repeatingNumber: number;
  completedDates: number[];
  deletedDates: number[];
  color: TaskColors;
  sortIdx: number;
  sortIdxList: Record<string, number>;
}

export type TotalTodo = Partial<Task> & Partial<RepetitiveTask>;

export type UnionTask = Task | RepetitiveTask;
