import { Container, CssBaseline, Stack } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import AddModal from '../components/modals/AddModal';
import DayBox from '../components/DayBox';
import DateControllPanel from '../components/DateControllPanel';
import { userState } from '../recoil/user';
import { currentWeekDaysState, todayState } from '../recoil/date';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Dialogs from '../components/dialogs/Dialogs';
import useTodo from '../hooks/useTodo';
import { auth } from '../firebase/init';

function Main() {
  const navigate = useNavigate();
  const setLoginData = useSetRecoilState(userState);
  const currentWeekDays = useRecoilValue(currentWeekDaysState);
  const { fetchTodosByRange } = useTodo();
  const user = useRecoilValue(userState);
  const setToday = useSetRecoilState(todayState);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setLoginData({ isLogin: true, uid: user.uid });
      } else {
        setLoginData({ isLogin: false, uid: '' });
        navigate('/login');
      }
    });
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
