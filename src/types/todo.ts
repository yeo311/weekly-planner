export interface Todo {
  id: string;
  date: Date;
  subject: string;
  isCompleted: boolean;
}

export type RepeatingTypes = 'weekly' | 'daily' | 'weekdays' | 'monthly';

export interface RepetitiveTodo {
  id: string;
  subject: string;
  startDate: Date;
  endDate: Date;
  repeatingType: RepeatingTypes;
  repeatingNumber: number;
  completedDates: Date[];
}
