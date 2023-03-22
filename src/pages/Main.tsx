import { Container, CssBaseline, Stack } from '@mui/material';
import { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import AddModal from '../components/AddModal';
import DayBox from '../components/DayBox';
import DateControllPanel from '../components/DateControllPanel';
import { userState } from '../recoil/user';
import { currentWeekDaysState } from '../recoil/date';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import DeleteDialog from '../components/DeleteDialog';

function Main() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useRecoilState(userState);
  const currentWeekDays = useRecoilValue(currentWeekDaysState);

  useLayoutEffect(() => {
    if (loginData.isLogin) return;
    const uid = window.sessionStorage.getItem('uid');
    if (uid) {
      setLoginData({ isLogin: true, uid });
    } else {
      navigate('/login');
    }
  }, []);

  return (
    <>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Container maxWidth="xl">
          <DateControllPanel />
          <Stack direction="row" spacing={2}>
            {currentWeekDays.map((date, i) => (
              <DayBox key={i} date={date} />
            ))}
          </Stack>
        </Container>
        <AddModal />
        <DeleteDialog />
      </LocalizationProvider>
    </>
  );
}

export default Main;
