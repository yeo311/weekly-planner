import { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { loginState } from './recoil/loginState';

function App() {
  const navigate = useNavigate();
  const login = useRecoilValue(loginState);

  useLayoutEffect(() => {
    if (!login.isLogin) {
      navigate('/login');
    }
  }, []);

  return <div className="App">Hello</div>;
}

export default App;
