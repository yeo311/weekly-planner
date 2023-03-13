import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { loginState } from './recoil/loginState';
import { auth } from './utils/firebase';

export default function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const setLoginState = useSetRecoilState(loginState);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!emailRef.current || !passwordRef.current) return;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );
      setLoginState({ isLogin: true, uid: userCredential.user.uid });
      navigate('/');
    } catch (error) {
      console.log(error);
      window.alert('계정과 비밀번호를 확인해주세요');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input ref={emailRef} type="email" placeholder="email" />
      <input ref={passwordRef} type="password" placeholder="password" />
      <button type="submit" onClick={handleSubmit}>
        submit
      </button>
    </div>
  );
}
