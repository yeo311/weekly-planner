import {
  Alert,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
} from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import MarginBox from '../components/MarginBox';
import { userState } from '../recoil/user';
import { auth } from '../firebase/init';

export default function Login() {
  const setLoginState = useSetRecoilState(userState);
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [isKeepLogin, setIsKeepLogin] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!email || !password) return;
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setLoginState({ isLogin: true, uid: userCredential.user.uid });
      if (isKeepLogin) {
        window.localStorage.setItem('uid', userCredential.user.uid);
      } else {
        window.sessionStorage.setItem('uid', userCredential.user.uid);
      }
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
      <MarginBox />
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
        <MarginBox />
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
        <MarginBox />
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                value={isKeepLogin}
                onChange={(_, v) => setIsKeepLogin(v)}
              />
            }
            label="로그인 유지"
          />
        </FormGroup>
        {isError && (
          <>
            <MarginBox />
            <Alert severity="error">계정과 패스워드를 확인해주세요.</Alert>
          </>
        )}
        <MarginBox />
        <Button variant="contained" onClick={handleSubmit}>
          로그인
        </Button>
      </Box>
    </Container>
  );
}
