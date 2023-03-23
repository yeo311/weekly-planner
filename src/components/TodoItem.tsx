import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import useTodo from '../hooks/useTodo';
import { Todo, TodoColors } from '../types/todo';
import { useSetRecoilState } from 'recoil';
import { deleteDialogState } from '../recoil/modal';

interface TodoItemProps {
  todo: Todo;
}

const DISABLE_COLOR = '#c4c4c4';

const TodoItem = ({ todo }: TodoItemProps) => {
  const { fetchTodos, updateIsCompleted } = useTodo();
  const setDialog = useSetRecoilState(deleteDialogState);

  const deleteItem = () => {
    setDialog({ isOpen: true, targetTodo: todo });
  };

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

  const labelId = `todo-item-label-${todo.id}`;
  const todoColor = todo.color || TodoColors.Green;
  return (
    <ListItem disablePadding>
      <ListItemButton
        onClick={toggleIsCompleted}
        onDoubleClick={deleteItem}
        dense
        sx={{
          margin: '2px 0px',
          padding: '4px 8px',
          backgroundColor: !todo.isCompleted ? todoColor : DISABLE_COLOR,
          '&:hover': {
            backgroundColor: !todo.isCompleted ? todoColor : DISABLE_COLOR,
          },
        }}
      >
        <ListItemText
          id={labelId}
          primary={todo.subject}
          sx={{ textDecoration: !todo.isCompleted ? 'none' : 'line-through' }}
          primaryTypographyProps={{
            sx: {
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            },
          }}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default TodoItem;
