import { useRecoilState, useRecoilValue } from 'recoil';
import { userState } from '../recoil/user';
import { todoListState } from '../recoil/todo';
import {
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
