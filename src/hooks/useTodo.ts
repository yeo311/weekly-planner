import { useRecoilState, useRecoilValue } from 'recoil';
import { loginState } from '../recoil/loginState';
import { todoListState } from '../recoil/todoList';
import { getFireBaseTodosByDate } from '../utils/firebase';
import { Todo } from '../types/todo';

export default function useTodo() {
  const { uid } = useRecoilValue(loginState);
  const [todos, setTodos] = useRecoilState(todoListState);

  const fetchTodos = async (date: Date) => {
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

  return { getTodos, fetchTodos };
}
