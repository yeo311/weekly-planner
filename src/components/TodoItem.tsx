import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
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

  const labelId = `todo-item-label-${todo.id}`;
  return (
    <ListItem
      disablePadding
      secondaryAction={
        <IconButton
          edge="end"
          aria-lebel="delete"
          onClick={handleClickDeleteBtn}
        >
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemButton onClick={toggleIsCompleted} dense>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={todo.isCompleted}
            tabIndex={-1}
            disableRipple
            inputProps={{ 'aria-labelledby': labelId }}
          />
        </ListItemIcon>
        <ListItemText id={labelId} primary={todo.subject} />
      </ListItemButton>
    </ListItem>
  );
};

export default TodoItem;
