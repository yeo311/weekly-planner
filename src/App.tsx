import { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import TodoModal from './components/TodoModal';
import { loginState } from './recoil/loginState';
import { modalState } from './recoil/modalState';

function App() {
  const navigate = useNavigate();
  const login = useRecoilValue(loginState);
  const [showModal, setShowModal] = useRecoilState(modalState);

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
    </div>
  );
}

export default App;
