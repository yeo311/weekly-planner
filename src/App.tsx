import { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import TodoModal from './components/TodoModal';
import useTodo from './hooks/useTodo';
import { loginState } from './recoil/loginState';
import { modalState } from './recoil/modalState';
import { thisWeekState } from './recoil/thisWeekState';
import { getThisWeekDateArray } from './utils/date';

function App() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useRecoilState(loginState);
  const [showModal, setShowModal] = useRecoilState(modalState);
  const { todoList, todoListsByDate } = useTodo();
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
    <div className="App">
      Hello
      <button
        onClick={() => {
          setShowModal(true);
        }}
      >
        투두 입력
      </button>
      {showModal && <TodoModal />}
      {todoList.map((todo) => (
        <div key={todo.id}>
          {todo.subject} {todo.date.toISOString()}
        </div>
      ))}
    </div>
  );
}

export default App;
