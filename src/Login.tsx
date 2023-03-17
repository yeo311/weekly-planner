import {
  Alert,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { loginState } from './recoil/loginState';
import { auth } from './utils/firebase';

export default function Login() {
  const setLoginState = useSetRecoilState(loginState);
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!email || !password) return;
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setLoginState({ isLogin: true, uid: userCredential.user.uid });
      window.sessionStorage.setItem('uid', userCredential.user.uid);
      navigate('/');
    } catch (error) {
      console.error(error);
      setIsError(true);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h4">WEEKLY PLANNER 로그인</Typography>
      <Box sx={{ height: 20 }} />
      <Box component="form">
        <div>
          <TextField
            type="email"
            label="Email"
            fullWidth
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <Box sx={{ height: 20 }} />
        <div>
          <TextField
            type="password"
            label="Password"
            fullWidth
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSubmit();
              }
            }}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        {isError && (
          <>
            <Box sx={{ height: 20 }} />
            <Alert severity="error">계정과 패스워드를 확인해주세요.</Alert>
          </>
        )}
        <Box sx={{ height: 20 }} />
        <Button variant="contained" onClick={handleSubmit}>
          로그인
        </Button>
      </Box>
    </Container>
  );
}
