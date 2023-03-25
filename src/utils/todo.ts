import { RepetitiveTodo, Todo } from '../types/todo';

export function RepetitiveTodoToSingleTodo(
  { id, subject, color, repeatingType, completedDates }: RepetitiveTodo,
  date: Date
): Todo {
  return {
    id,
    date,
    subject,
    color,
    repeatingType,
    isCompleted: completedDates.includes(date.getTime()),
  };
}
