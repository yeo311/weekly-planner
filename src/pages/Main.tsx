import { Container, CssBaseline, Stack } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import AddModal from '../components/modals/AddModal';
import DayBox from '../components/DayBox';
import DateControllPanel from '../components/DateControllPanel';
import { userState } from '../recoil/user';
import { currentWeekDaysState } from '../recoil/date';
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
