import {
  List,
  ListItem,
  ListItemButton,
  ListSubheader,
  Typography,
} from '@mui/material';
import { dayArr } from '../utils/date';
import AddIcon from '@mui/icons-material/Add';
import { useSetRecoilState } from 'recoil';
import { addModalState } from '../recoil/modal';
import useTodo from '../hooks/useTodo';
import { useEffect } from 'react';
import TodoItem from './TodoItem';
import { Stack } from '@mui/system';

interface DayProps {
  date: Date;
  width: string;
}

const DayBox = ({ date, width }: DayProps) => {
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
      sx={{ width, minHeight: 300 }}
      subheader={
        <ListSubheader sx={{ padding: '0px' }}>
          <Stack
            direction={'row'}
            spacing={1}
            sx={{
              alignItems: 'center',
              borderBottom: '1px solid gray',
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 800 }}>{`${
              dayArr[date.getDay()]
            }`}</Typography>
            <Typography variant="body1">{date.getDate()}</Typography>
          </Stack>
        </ListSubheader>
      }
    >
      {getTodos(date)?.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}

      <ListItem disablePadding>
        <ListItemButton
          onClick={handleClickAddButton}
          dense
          sx={{
            margin: '2px 0px',
            padding: '4px 8px',
            border: '1px solid lightgray',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <AddIcon sx={{ color: 'lightgray' }} />
        </ListItemButton>
      </ListItem>
    </List>
  );
};

export default DayBox;
