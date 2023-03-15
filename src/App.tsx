import { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import TodoModal from './components/TodoModal';
import useTodo from './hooks/useTodo';
import { loginState } from './recoil/loginState';
import { modalState } from './recoil/modalState';

function App() {
  const navigate = useNavigate();
  const login = useRecoilValue(loginState);
  const [showModal, setShowModal] = useRecoilState(modalState);
  const {todoList} = useTodo();

  useLayoutEffect(() => {
    if (!login.isLogin) {
      navigate('/login');
    }
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
      {todoList.map(todo => <div>{todo.subject} {todo.date.toDate().toISOString()}</div>)}
    </div>
  );
}

export default App;
