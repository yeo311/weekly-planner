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
import MarginBox from '../components/MarginBox';
import { auth } from '../firebase/init';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!email || !password) return;
    try {
      await signInWithEmailAndPassword(auth, email, password);
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
