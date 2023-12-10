import { onAuthStateChanged, type User } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase/init';

type AuthState =
  | { state: 'loading' }
  | { state: 'success'; isAuthentication: true; user: User }
  | { state: 'success'; isAuthentication: false; user: null }
  | { state: 'error'; error: Error };

export const AuthContext = createContext<AuthState>({ state: 'loading' });

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [authState, setAuthState] = useState<AuthState>({
    state: 'loading',
  });

  const onChange = (user: User | null) => {
    if (user) {
      setAuthState({ state: 'success', isAuthentication: true, user });
    } else {
      setAuthState({ state: 'success', isAuthentication: false, user });
    }
  };
  const setError = (error: Error) => {
    setAuthState({ state: 'error', error });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, onChange, setError);
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
};
