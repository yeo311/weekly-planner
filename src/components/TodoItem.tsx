import { Stack, Typography, Checkbox } from '@mui/material';
import useTodo from '../hooks/useTodo';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem = ({ todo }: TodoItemProps) => {
  const { fetchTodos, updateIsCompleted } = useTodo();

  const toggleIsCompleted = () => {
    updateIsCompleted(todo.id, !todo.isCompleted).then(() => {
      fetchTodos(todo.date);
    });
  };

  return (
    <Stack direction="row" alignItems="center">
      <Checkbox checked={todo.isCompleted} onChange={toggleIsCompleted} />
      <Typography>{todo.subject}</Typography>
    </Stack>
  );
};

export default TodoItem;
