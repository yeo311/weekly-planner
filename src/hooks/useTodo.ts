import { useRecoilState, useRecoilValue } from 'recoil';
import { userState } from '../recoil/user';
import { todoListState } from '../recoil/todo';
import { RepeatingTypes, RepetitiveTodoDeleteTypes, Todo } from '../types/todo';
import {
  getRepetitiveTodoById,
  getRepetitiveTodosByDateRange,
  getTodoById,
  getTodosByDateRange,
} from '../firebase/read';
import {
  updateFirebaseRepetitiveTodosIsCompleted,
  updateFirebaseTodoItem,
} from '../firebase/update';
import {
  deleteFirebaseRepetitiveTodo,
  deleteFirebaseTodo,
} from '../firebase/delete';
import { currentWeekDaysState } from '../recoil/date';
import { checkIfRepeatTodoAreIncludedInThisDate } from '../utils/date';
import { RepetitiveTodoToSingleTodo } from '../utils/todo';

export default function useTodo() {
  const { uid } = useRecoilValue(userState);
  const [todos, setTodos] = useRecoilState(todoListState);
  const currentWeekDays = useRecoilValue(currentWeekDaysState);

  const fetchTodosByRange = async () => {
    if (!currentWeekDays.length) {
      console.error('Current Week not set');
    }

    const todos = await getTodosByDateRange(
      uid,
      currentWeekDays[0],
      currentWeekDays[currentWeekDays.length - 1]
    );
    const weeklyTodos = todos.reduce<Record<number, Todo[]>>((acc, cur) => {
      const key = cur.date.getTime();
      if (!acc[key]) {
        acc[key] = [cur];
      } else {
        acc[key].push(cur);
      }
      return acc;
    }, {});

    const repetitiveTodos = await getRepetitiveTodosByDateRange(
      uid,
      currentWeekDays[0],
      currentWeekDays[currentWeekDays.length - 1]
    );

    currentWeekDays.forEach((day) => {
      const includeTodos = repetitiveTodos
        .filter((todo) => checkIfRepeatTodoAreIncludedInThisDate(day, todo))
        .map((todo) => RepetitiveTodoToSingleTodo(todo, day));
      if (!weeklyTodos[day.getTime()]) {
        weeklyTodos[day.getTime()] = includeTodos;
      } else {
        weeklyTodos[day.getTime()] = [
          ...weeklyTodos[day.getTime()],
          ...includeTodos,
        ];
      }
    });

    setTodos((prev) => {
      return { ...prev, ...weeklyTodos };
    });
  };

  const fetchTodoById = async (id: string, type: RepeatingTypes) => {
    if (!type || type === 'single') {
      const todo = await getTodoById(uid, id);
      const key = todo.date.getTime();
      setTodos((prev) => {
        if (!prev[key]) {
          return { ...prev, [key]: [todo] };
        } else {
          const afterRemove = prev[key].filter((t) => t.id !== id);
          return { ...prev, [key]: [...afterRemove, todo] };
        }
      });
    } else {
      const repeatTodo = await getRepetitiveTodoById(uid, id);
      const newData: typeof todos = {};
      currentWeekDays.forEach((day) => {
        const isInclude = checkIfRepeatTodoAreIncludedInThisDate(
          day,
          repeatTodo
        );
        const key = day.getTime();
        if (!isInclude) {
          if (todos[key].findIndex((t) => t.id === id) > -1) {
            newData[key] = todos[key].filter((t) => t.id !== id);
          }
          return;
        }
        const singleTodo = RepetitiveTodoToSingleTodo(repeatTodo, day);
        if (todos[key].findIndex((t) => t.id === id) > -1) {
          newData[key] = todos[key].map((t) => (t.id === id ? singleTodo : t));
        } else {
          newData[key] = [...todos[key], singleTodo];
        }
      });
      setTodos((prev) => {
        return { ...prev, ...newData };
      });
    }
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
    if (!repeatingType || repeatingType === 'single') {
      return updateFirebaseTodoItem(uid, todoId, isCompleted);
    }
    return updateFirebaseRepetitiveTodosIsCompleted(
      uid,
      todoId,
      isCompleted,
      date
    );
  };

  const deleteTodo = (
    todo: Todo,
    repetitiveTodoDeleteType: RepetitiveTodoDeleteTypes
  ) => {
    if (!todo.repeatingType || todo.repeatingType === 'single') {
      return deleteFirebaseTodo(uid, todo.id);
    }
    return deleteFirebaseRepetitiveTodo(uid, todo, repetitiveTodoDeleteType);
  };

  return {
    getTodos,
    updateIsCompleted,
    deleteTodo,
    fetchTodosByRange,
    fetchTodoById,
    setTodos,
  };
}
