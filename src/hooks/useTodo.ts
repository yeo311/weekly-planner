import { useRecoilState, useRecoilValue } from 'recoil';
import { userState } from '../recoil/user';
import { todoListState } from '../recoil/todo';
import {
  getFirebaseRepetitiveTodosByDate,
  getFireBaseTodosByDate,
  updateFirebaseTodoItem,
} from '../utils/firebase';
import { Todo } from '../types/todo';

export default function useTodo() {
  const { uid } = useRecoilValue(userState);
  const [todos, setTodos] = useRecoilState(todoListState);

  const fetchTodos = async (date: Date) => {
    if (!uid) return;
    const querySnapshot = await getFireBaseTodosByDate(uid, date);
    const dayTodos: Todo[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      dayTodos.push({
        subject: data.subject,
        date: data.date.toDate(),
        isCompleted: data.isCompleted,
        id: doc.id,
        repeatingType: 'single',
      });
    });

    const repeatitiveTodoQuerySnapshot = await getFirebaseRepetitiveTodosByDate(
      uid,
      date
    );

    repeatitiveTodoQuerySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.startDate.toDate().getTime() > date.getTime()) return;
      if (
        data.repeatingType === 'weekly' &&
        data.repeatingNumber !== date.getDay()
      )
        return;

      if (
        data.repeatingType === 'monthly' &&
        data.repeatingNumber !== date.getDate()
      )
        return;

      if (
        data.repeatingType === 'weekdays' &&
        (date.getDay() === 0 || date.getDay() === 6)
      )
        return;

      dayTodos.push({
        subject: data.subject,
        repeatingType: data.repeatingType,
        date,
        id: doc.id,
        isCompleted: data.completedDates.includes(date.getTime()),
      });
    });

    setTodos((prevTodos) => ({ ...prevTodos, [date.getTime()]: dayTodos }));
  };

  const getTodos = (date: Date) => {
    return todos[date.getTime()];
  };

  const updateIsCompleted = (todoId: string, isCompleted: boolean) => {
    return updateFirebaseTodoItem(uid, todoId, isCompleted);
  };

  return { getTodos, fetchTodos, updateIsCompleted };
}
