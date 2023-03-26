import { Button, Stack, Typography } from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentDateState, todayState } from '../recoil/date';
import ArrowIconButton from './buttons/ArrowIconButton';

const DateControllPanel = () => {
  const [currentDate, setCurrentDate] = useRecoilState(currentDateState);
  const [openDatePicker, setOpenDatePicker] = useState<boolean>(false);
  const today = useRecoilValue(todayState);
  const [selectDay, setSelectDay] = useState<Dayjs>(dayjs());

  const moveWeek = (moveDateCount: number) => {
    setCurrentDate((prevDate) => {
      const newDate = prevDate + moveDateCount * 24 * 60 * 60 * 1000;
      return newDate;
    });
  };

  const handleClickDate = () => {
    setOpenDatePicker(true);
  };

  const curDate = new Date(currentDate);

  return (
    <Stack direction="row" spacing={3} alignItems="center" height={50}>
      <ArrowIconButton direction="left" onClick={() => moveWeek(-7)} />
      <Button
        variant="outlined"
        size="small"
        color="inherit"
        onClick={() => setCurrentDate(today.getTime())}
      >
        오늘
      </Button>
      <ArrowIconButton direction="right" onClick={() => moveWeek(7)} />

      <Button color="inherit" onClick={handleClickDate}>
        <Typography variant="h6">{`${curDate.getFullYear()}년 ${
          curDate.getMonth() + 1
        }월`}</Typography>
      </Button>
      <MobileDatePicker
        open={openDatePicker}
        sx={{ '.MuiInputBase-root': { display: 'none' } }}
        value={selectDay}
        onChange={(v) => v && setSelectDay(v)}
        onAccept={() => setCurrentDate(selectDay.valueOf())}
        onClose={() => setOpenDatePicker(false)}
      />
    </Stack>
  );
};

export default DateControllPanel;
