import { Stack, Typography } from '@mui/material';
import { useRecoilState } from 'recoil';
import { currentDateState } from '../recoil/date';
import ArrowIconButton from './buttons/ArrowIconButton';

const DateControllPanel = () => {
  const [currentDate, setCurrentDate] = useRecoilState(currentDateState);

  const moveWeek = (moveDateCount: number) => {
    setCurrentDate((prevDate) => {
      const newDate = prevDate + moveDateCount * 24 * 60 * 60 * 1000;
      return newDate;
    });
  };

  const curDate = new Date(currentDate);

  return (
    <Stack direction="row" spacing={3} alignItems="center" height={50}>
      <ArrowIconButton direction="left" onClick={() => moveWeek(-7)} />
      <ArrowIconButton direction="right" onClick={() => moveWeek(7)} />

      <Typography variant="h6">{`${curDate.getFullYear()}년 ${
        curDate.getMonth() + 1
      }월`}</Typography>
    </Stack>
  );
};

export default DateControllPanel;
