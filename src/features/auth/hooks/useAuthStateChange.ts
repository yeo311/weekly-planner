import { auth, userState } from '@/shared';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuthStateChange = () => {
  const navigate = useNavigate();
  const setUser = useSetAtom(userState);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user.uid);
      } else {
        setUser('');
        navigate('/login');
      }
    });
  }, [navigate, setUser]);
};
