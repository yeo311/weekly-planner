import {
  Checkbox,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import useTodo from '../hooks/useTodo';
import { Todo, TodoColors } from '../types/todo';
import { useSetRecoilState } from 'recoil';
import { dialogState } from '../recoil/modal';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem = ({ todo }: TodoItemProps) => {
  const { updateIsCompleted, fetchTodoById } = useTodo();
  const setDialog = useSetRecoilState(dialogState);

  const openDialog = () => {
    setDialog({ isOpen: true, targetTodo: todo, type: 'info' });
  };

  const handleChecked = (
    e: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    // e.preventDefault();
    e.stopPropagation();
    updateIsCompleted(todo.id, checked, todo.repeatingType, todo.date).then(
      () => {
        fetchTodoById(todo.id, todo.repeatingType);
      }
    );
  };

  const labelId = `todo-item-label-${todo.id}`;
  const todoColor = todo.color || TodoColors.Green;
  return (
    <ListItem disablePadding>
      <ListItemButton
        dense
        sx={{
          margin: '2px 0px',
          padding: '4px 8px 4px 0px',
          backgroundColor: todoColor,
          '&:hover': {
            backgroundColor: todoColor,
          },
        }}
      >
        <Checkbox
          size="small"
          checked={todo.isCompleted}
          onChange={handleChecked}
        />
        <ListItemText
          id={labelId}
          primary={todo.subject}
          primaryTypographyProps={{
            sx: {
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            },
          }}
          onClick={openDialog}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default TodoItem;
