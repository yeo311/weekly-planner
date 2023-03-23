import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import useTodo from '../hooks/useTodo';
import { Todo } from '../types/todo';
import { useSetRecoilState } from 'recoil';
import { deleteDialogState } from '../recoil/modal';
import { useState } from 'react';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem = ({ todo }: TodoItemProps) => {
  const { fetchTodos, updateIsCompleted } = useTodo();
  const setDialog = useSetRecoilState(deleteDialogState);
  const [mouseDownTime, setMouseDownTime] = useState<number | null>(null);

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

  const handleMouseDown = () => {
    setMouseDownTime(new Date().getTime());
  };

  const handleMouseUp = () => {
    if (mouseDownTime !== null && new Date().getTime() - mouseDownTime >= 500) {
      deleteItem();
    } else {
      toggleIsCompleted();
    }
  };

  const labelId = `todo-item-label-${todo.id}`;
  return (
    <ListItem disablePadding>
      <ListItemButton
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        dense
        sx={{
          margin: '2px 0px',
          padding: '4px 8px',
          backgroundColor: todo.isCompleted ? '#d5eecf' : '#c4c4c4',
        }}
      >
        <ListItemText
          id={labelId}
          primary={todo.subject}
          sx={{ textDecoration: todo.isCompleted ? 'none' : 'line-through' }}
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
