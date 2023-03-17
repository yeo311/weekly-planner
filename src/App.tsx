import { Container, CssBaseline, Stack } from '@mui/material';
import { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import AddModal from './components/AddModal';
import DayBox from './components/DayBox';
import WeekTitle from './components/WeekTitle';
import useTodo from './hooks/useTodo';
import { loginState } from './recoil/loginState';
import { thisWeekState } from './recoil/thisWeekState';
import { getThisWeekDateArray } from './utils/date';

function App() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useRecoilState(loginState);
  const { todoListsByDate } = useTodo();
  const setThisWeek = useSetRecoilState(thisWeekState);

  useLayoutEffect(() => {
    if (loginData.isLogin) return;
    const uid = window.sessionStorage.getItem('uid');
    if (uid) {
      setLoginData({ isLogin: true, uid });
    } else {
      navigate('/login');
    }
  }, []);

  useLayoutEffect(() => {
    setThisWeek(getThisWeekDateArray());
  }, []);

  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl">
        <WeekTitle />
        <Stack direction="row" spacing={2}>
          {todoListsByDate.map((todos, i) => (
            <DayBox key={i} date={todos.date} list={todos.list} />
          ))}
        </Stack>
      </Container>
      <AddModal />
    </>
  );
}

export default App;
