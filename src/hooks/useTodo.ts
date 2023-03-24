import { useRecoilState, useRecoilValue } from 'recoil';
import { userState } from '../recoil/user';
import { todoListState } from '../recoil/todo';
import { RepeatingTypes, RepetitiveTodoDeleteTypes, Todo } from '../types/todo';
import {
  getFirebaseRepetitiveTodosByDate,
  getFireBaseTodosByDate,
} from '../firebase/read';
import {
  updateFirebaseRepetitiveTodosIsCompleted,
  updateFirebaseTodoItem,
} from '../firebase/update';
import {
  deleteFirebaseRepetitiveTodo,
  deleteFirebaseTodo,
} from '../firebase/delete';

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
        color: data.color,
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
      ) {
        return;
      }

      if (
        data.repeatingType === 'monthly' &&
        data.repeatingNumber !== date.getDate()
      ) {
        return;
      }

      if (
        data.repeatingType === 'weekdays' &&
        (date.getDay() === 0 || date.getDay() === 6)
      ) {
        return;
      }

      if (!!data.deletedDates && data.deletedDates.includes(date.getTime())) {
        return;
      }

      dayTodos.push({
        subject: data.subject,
        repeatingType: data.repeatingType,
        date,
        id: doc.id,
        isCompleted: data.completedDates.includes(date.getTime()),
        color: data.color,
      });
    });

    setTodos((prevTodos) => ({ ...prevTodos, [date.getTime()]: dayTodos }));
  };

  const getTodos = (date: Date) => {
    return todos[date.getTime()];
  };

  const updateIsCompleted = (
    todoId: string,
    isCompleted: boolean,
    repeatingType: RepeatingTypes,
    date: Date
  ) => {
    if (repeatingType === 'single') {
      return updateFirebaseTodoItem(uid, todoId, isCompleted);
    }
    return updateFirebaseRepetitiveTodosIsCompleted(
      uid,
      todoId,
      isCompleted,
      date
    );
  };

  const cleanTodos = () => {
    setTodos({});
  };

  const deleteTodo = (
    todo: Todo,
    repetitiveTodoDeleteType: RepetitiveTodoDeleteTypes
  ) => {
    if (todo.repeatingType === 'single') {
      return deleteFirebaseTodo(uid, todo.id);
    }
    return deleteFirebaseRepetitiveTodo(uid, todo, repetitiveTodoDeleteType);
  };

  return { getTodos, fetchTodos, updateIsCompleted, cleanTodos, deleteTodo };
}
