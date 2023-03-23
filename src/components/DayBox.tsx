import { IconButton, List, ListSubheader, Typography } from '@mui/material';
import { dayArr } from '../utils/date';
import AddIcon from '@mui/icons-material/Add';
import { useSetRecoilState } from 'recoil';
import { addModalState } from '../recoil/modal';
import useTodo from '../hooks/useTodo';
import { useEffect } from 'react';
import TodoItem from './TodoItem';
import { grey } from '@mui/material/colors';

interface DayProps {
  date: Date;
}

const DayBox = ({ date }: DayProps) => {
  const setModalState = useSetRecoilState(addModalState);
  const { getTodos, fetchTodos } = useTodo();

  const handleClickAddButton = () => {
    setModalState({ isShowModal: true, targetDate: date });
  };

  useEffect(() => {
    if (getTodos(date)) return;
    fetchTodos(date);
  }, [date, getTodos, fetchTodos]);

  return (
    <List
      sx={{
        height: '400px',
        bgcolor: 'background.paper',
        flexBasis: '300px',
        flexGrow: 1,
        padding: '0 10px',
        border: `1px solid ${grey[100]}`,
        overflow: 'auto',
      }}
      subheader={
        <ListSubheader
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6">{`${
            dayArr[date.getDay()]
          } ${date.getDate()}`}</Typography>
          <IconButton onClick={handleClickAddButton} edge="end">
            <AddIcon />
          </IconButton>
        </ListSubheader>
      }
    >
      {getTodos(date)?.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </List>
  );
};

export default DayBox;
