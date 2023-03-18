import { IconButton, Paper, Stack, Typography } from '@mui/material';
import { dayArr } from '../utils/date';
import AddIcon from '@mui/icons-material/Add';
import { useSetRecoilState } from 'recoil';
import { addModalState } from '../recoil/modalState';
import useTodo from '../hooks/useTodo';
import { useEffect } from 'react';
import TodoItem from './TodoItem';

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
    <Paper elevation={3} sx={{ padding: '10px', width: '200px' }}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography variant="h6">{dayArr[date.getDay()]}</Typography>
        <Typography>{date.getDate()}</Typography>
        <IconButton onClick={handleClickAddButton}>
          <AddIcon />
        </IconButton>
      </Stack>
      <Stack>
        {getTodos(date)?.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </Stack>
    </Paper>
  );
};

export default DayBox;
