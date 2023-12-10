import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { Loader } from '@mantine/core';

const MainPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  if (auth.state === 'loading') return <Loader />;
  if (auth.state === 'error') return <div>인증 에러</div>;
  if (!auth.isAuthentication) {
    navigate('/login');
  }

  return <div>Main</div>;
};

export default MainPage;
