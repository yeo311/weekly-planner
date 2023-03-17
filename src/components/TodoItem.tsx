import { Stack, Typography, Checkbox } from '@mui/material';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem = ({ todo }: TodoItemProps) => {
  return (
    <Stack direction="row" alignItems="center">
      <Checkbox checked={todo.isCompleted} />
      <Typography>{todo.subject}</Typography>
    </Stack>
  );
};

export default TodoItem;
