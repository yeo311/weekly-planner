import {
  Chip,
  List,
  ListItem,
  ListItemButton,
  ListSubheader,
  Typography,
} from '@mui/material';
import { dayArr, isSameDate } from '../utils/date';
import AddIcon from '@mui/icons-material/Add';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { addModalState } from '../recoil/modal';
import useTodo from '../hooks/useTodo';
import TodoItem from './TodoItem';
import { Stack } from '@mui/system';
import { todayState } from '../recoil/date';

interface DayProps {
  date: Date;
  width: string;
}

const DayBox = ({ date, width }: DayProps) => {
  const setModalState = useSetRecoilState(addModalState);
  const today = useRecoilValue(todayState);
  const { getTodos } = useTodo();

  const handleClickAddButton = () => {
    setModalState({ isShowModal: true, targetDate: date });
  };

  const isToday = isSameDate(today, date);
  const day = date.getDay();
  const isSat = day === 6;
  const isSun = day === 0;

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
              paddingBottom: '5px',
              borderBottom: '1px solid gray',
              color: isSat ? '#2d83e8' : isSun ? '#f21d1d' : 'black',
            }}
          >
            <Typography
              variant="body1"
              sx={{ fontWeight: 800 }}
            >{`${dayArr[day]}`}</Typography>
            <Typography variant="body1">{date.getDate()}</Typography>
            {isToday && <Chip label="오늘" size="small" color="info" />}
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
