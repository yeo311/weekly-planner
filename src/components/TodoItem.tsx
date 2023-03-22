import { Stack, Typography, Checkbox, IconButton } from '@mui/material';
import useTodo from '../hooks/useTodo';
import { Todo } from '../types/todo';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSetRecoilState } from 'recoil';
import { deleteDialogState } from '../recoil/modal';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem = ({ todo }: TodoItemProps) => {
  const { fetchTodos, updateIsCompleted } = useTodo();
  const setDialog = useSetRecoilState(deleteDialogState);

  const toggleIsCompleted = () => {
    updateIsCompleted(
      todo.id,
      !todo.isCompleted,
      todo.repeatingType,
      todo.date
    ).then(() => {
      fetchTodos(todo.date);
    });
  };

  const handleClickDeleteBtn = () => {
    setDialog({ isOpen: true, targetTodo: todo });
  };

  return (
    <Stack direction="row" alignItems="center">
      <Checkbox checked={todo.isCompleted} onChange={toggleIsCompleted} />
      <Typography>{todo.subject}</Typography>
      <IconButton onClick={handleClickDeleteBtn}>
        <DeleteIcon />
      </IconButton>
    </Stack>
  );
};

export default TodoItem;
