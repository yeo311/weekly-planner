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
  repeatingType: RepeatingTypes;
  color: TaskColors;
  sortIdx: number;
}

export interface RepetitiveTask {
  id: string;
  subject: string;
  startDate: Dayjs;
  endDate: Dayjs;
  repeatingType: RepeatingTypes;
  repeatingNumber: number;
  completedDates: number[];
  deletedDates: number[];
  color: TaskColors;
  sortIdxList: Record<string, number>;
}

export type TotalTask = Partial<Task> & Partial<RepetitiveTask>;
