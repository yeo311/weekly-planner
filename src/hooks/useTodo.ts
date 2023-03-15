import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { loginState } from '../recoil/loginState';
import { Todo, todoListsByDateState, todoListState } from '../recoil/todoList';
import { subscribeTodoData } from '../utils/firebase';

export default function useTodo() {
  const loginData = useRecoilValue(loginState);
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const todoListsByDate = useRecoilValue(todoListsByDateState);

  useEffect(() => {
    if (!loginData.uid) return;
    const unSub = subscribeTodoData(loginData.uid, (querySnapshot) => {
      const todos: Todo[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        todos.push({
          subject: data.subject,
          date: data.date.toDate(),
          isCompleted: data.isCompleted,
          id: doc.id,
        });
      });
      setTodoList(todos);
    });

    return () => {
      unSub();
    };
  }, [loginData]);

  return { todoList, todoListsByDate };
}
