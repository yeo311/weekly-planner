import { IconButton, Stack, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TodayIcon from '@mui/icons-material/Today';
import { blue } from '@mui/material/colors';
import { useRecoilState } from 'recoil';
import { currentDateState } from '../recoil/date';

const DateControllPanel = () => {
  const [currentDate, setCurrentDate] = useRecoilState(currentDateState);

  const moveWeek = (moveDateCount: number) => {
    setCurrentDate(
      (prevDate) =>
        new Date(prevDate.getTime() + moveDateCount * 24 * 60 * 60 * 1000)
    );
  };

  return (
    <Stack direction="row" spacing={3} alignItems="center">
      <TodayIcon fontSize="large" sx={{ color: blue[800] }} />
      <IconButton aria-label="back" onClick={() => moveWeek(-7)}>
        <ArrowBackIosNewIcon />
      </IconButton>
      <IconButton aria-label="forward" onClick={() => moveWeek(7)}>
        <ArrowForwardIosIcon />
      </IconButton>
      <Typography variant="h6">{`${currentDate.getFullYear()}년 ${
        currentDate.getMonth() + 1
      }월`}</Typography>
    </Stack>
  );
};

export default DateControllPanel;
