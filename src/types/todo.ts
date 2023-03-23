export type RepeatingTypes =
  | 'single'
  | 'weekly'
  | 'daily'
  | 'weekdays'
  | 'monthly';

export enum TodoColors {
  Green = '#d5eecf',
  Yellow = '#f8f7af',
  Orange = '#ffcba3',
  Red = '#ffa4a4',
  Violet = '#ebccff',
  Blue = '#cce9ff',
}

export type RepetitiveTodoDeleteTypes = 'only' | 'after' | 'all';

export interface Todo {
  id: string;
  date: Date;
  subject: string;
  isCompleted: boolean;
  repeatingType: RepeatingTypes;
  color: TodoColors;
}

export interface RepetitiveTodo {
  id: string;
  subject: string;
  startDate: Date;
  endDate: Date;
  repeatingType: RepeatingTypes;
  repeatingNumber: number;
  completedDates: number[];
  deletedDates: number[];
  color: TodoColors;
}
