import { IconButton, Stack, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TodayIcon from '@mui/icons-material/Today';
import { blue } from '@mui/material/colors';
import { useRecoilState } from 'recoil';
import { thisWeekState } from '../recoil/thisWeekState';

const WeekTitle = () => {
  const [thisWeek, setThisWeek] = useRecoilState(thisWeekState);

  const moveWeek = (moveDateCount: number) => {
    setThisWeek((prev) =>
      prev.map((date) => new Date(date.setDate(date.getDate() + moveDateCount)))
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
      {!!thisWeek.length && (
        <Typography variant="h6">{`${thisWeek[0].getFullYear()}년 ${
          thisWeek[0].getMonth() + 1
        }월`}</Typography>
      )}
    </Stack>
  );
};

export default WeekTitle;
