import { Container, CssBaseline, Stack } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import AddModal from '../components/modals/AddModal';
import DayBox from '../components/DayBox';
import DateControllPanel from '../components/DateControllPanel';
import { userState } from '../recoil/user';
import { currentWeekDaysState, todayState } from '../recoil/date';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Dialogs from '../components/dialogs/Dialogs';
import useTodo from '../hooks/useTodo';

function Main() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useRecoilState(userState);
  const currentWeekDays = useRecoilValue(currentWeekDaysState);
  const { fetchTodosByRange } = useTodo();
  const user = useRecoilValue(userState);
  const setToday = useSetRecoilState(todayState);

  useEffect(() => {
    if (loginData.isLogin) return;
    const uid =
      window.localStorage.getItem('uid') ||
      window.sessionStorage.getItem('uid');

    if (uid) {
      setLoginData({ isLogin: true, uid });
    } else {
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    if (user.uid && currentWeekDays.length > 0) {
      fetchTodosByRange();
    }
  }, [currentWeekDays, user.uid]);

  useEffect(() => {
    const visibilityChangeListner = () => {
      if (document.visibilityState === 'visible') {
        setToday(new Date());
      }
    };
    window.addEventListener('visibilitychange', visibilityChangeListner);
    return () => {
      window.removeEventListener('visibilitychange', visibilityChangeListner);
    };
  }, []);

  return (
    <>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Container sx={{ padding: '0px' }}>
          <DateControllPanel />
          <Stack direction={'row'} spacing={1}>
            {currentWeekDays.map((date, i) => (
              <DayBox key={i} width="14%" date={date} />
            ))}
          </Stack>
        </Container>
        <AddModal />
        <Dialogs />
      </LocalizationProvider>
    </>
  );
}

export default Main;
