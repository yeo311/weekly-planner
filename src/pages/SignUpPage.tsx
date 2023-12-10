import {
  Button,
  PasswordInput,
  TextInput,
  Title,
  Text,
  Center,
  Flex,
} from '@mantine/core';
import { IconUser, IconLock } from '@tabler/icons-react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../firebase/init';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { FirebaseError } from 'firebase/app';

const userIcon = <IconUser size={20} />;
const lockIcon = <IconLock size={20} />;

const SignUpPage = () => {
  const navigate = useNavigate();
  const [params, setParams] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setParams((prev) => ({ ...prev, [name]: value }));
  };

  const signUpMutation = useMutation({
    mutationKey: ['signUp', params],
    mutationFn: () =>
      createUserWithEmailAndPassword(auth, params.email, params.password),
    onSuccess: () => {
      alert('회원가입이 완료되었습니다.');
      navigate('/');
    },
    onError: (error: FirebaseError) => {
      if (error.code === 'auth/email-already-in-use') {
        alert('이미 사용중인 이메일입니다.');
        return;
      }
      if (error.code === 'auth/invalid-email') {
        alert('유효하지 않은 이메일입니다.');
        return;
      }
      if (error.code === 'auth/weak-password') {
        alert('비밀번호는 최소 6자리 이상이어야 합니다.');
        return;
      }
      alert('회원가입에 실패했습니다.');
    },
  });

  const handleSubmit = () => {
    if (Object.values(params).some((value) => value === '')) {
      alert('모든 항목을 입력해주세요.');
      return;
    }
    if (params.password !== params.passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    signUpMutation.mutate();
  };

  return (
    <Center h="100vh">
      <Flex
        w={'100%'}
        maw={500}
        px="sm"
        direction="column"
        align={'center'}
        gap="md"
      >
        <Title ff="'Dancing Script', cursive">Weekly Planner</Title>
        <Text c="gray" size="sm">
          위클리 플래너에 회원가입하세요.
        </Text>
        <TextInput
          type="email"
          name="email"
          onChange={handleChange}
          size="md"
          leftSection={userIcon}
          placeholder="이메일을 입력하세요."
          w="100%"
        />
        <PasswordInput
          name="password"
          onChange={handleChange}
          size="md"
          leftSection={lockIcon}
          placeholder="비밀번호를 입력하세요."
          w="100%"
        />
        <PasswordInput
          name="passwordConfirm"
          onChange={handleChange}
          size="md"
          leftSection={lockIcon}
          placeholder="비밀번호를 다시 한번 입력하세요."
          w="100%"
        />
        <Button fullWidth size="md" onClick={handleSubmit}>
          회원가입
        </Button>
      </Flex>
    </Center>
  );
};

export default SignUpPage;
