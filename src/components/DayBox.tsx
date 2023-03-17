import { IconButton, Paper, Stack, Typography } from '@mui/material';
import { Todo } from '../types/todo';
import { dayArr } from '../utils/date';
import TodoItem from './TodoItem';
import AddIcon from '@mui/icons-material/Add';
import { useSetRecoilState } from 'recoil';
import { addModalState } from '../recoil/modalState';

interface DayProps {
  date: Date;
  list: Todo[];
}

const DayBox = ({ date, list }: DayProps) => {
  const setModalState = useSetRecoilState(addModalState);

  const handleClickAddButton = () => {
    setModalState({ isShowModal: true, targetDate: date });
  };

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
        {list.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </Stack>
    </Paper>
  );
};

export default DayBox;
