import { useEffect } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { loginState } from "../recoil/loginState"
import { Todo, todoListState } from "../recoil/todoList";
import { subscribeTodoData } from "../utils/firebase"

export default function useTodo() {
  const loginData = useRecoilValue(loginState);
  const [todoList, setTodoList] = useRecoilState(todoListState);

  useEffect(() => {
    const unSub = subscribeTodoData(loginData.uid, (querySnapshot) => {
      const todos: Todo[] = [];
      querySnapshot.forEach((doc) => {
        todos.push({...doc.data() as Todo, id: doc.id})
      })
      setTodoList(todos);
    })

    return () => {
      unSub();
    };
  }, [loginData])

  return {todoList}
}