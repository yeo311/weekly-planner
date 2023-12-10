import {
  Button,
  PasswordInput,
  TextInput,
  Title,
  Text,
  Center,
  Flex,
  Anchor,
} from '@mantine/core';
import { IconUser, IconLock } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/init';

const userIcon = <IconUser size={20} />;
const lockIcon = <IconLock size={20} />;

const LoginPage = () => {
  const navigate = useNavigate();
  const [params, setParams] = useState({ email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setParams((prev) => ({ ...prev, [name]: value }));
  };

  const loginMutation = useMutation({
    mutationKey: ['login', params],
    mutationFn: () =>
      signInWithEmailAndPassword(auth, params.email, params.password),
    onSuccess: () => {
      navigate('/');
    },
    onError: (error) => {
      console.error(error);
      alert('아이디 또는 비밀번호를 확인해주세요.');
    },
  });

  const handleSubmit = () => {
    loginMutation.mutate();
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
          위클리 플래너에 로그인하세요
        </Text>
        <TextInput
          type="email"
          size="md"
          leftSection={userIcon}
          placeholder="이메일을 입력하세요."
          w="100%"
          value={params.email}
          onChange={handleChange}
        />
        <PasswordInput
          size="md"
          leftSection={lockIcon}
          placeholder="비밀번호를 입력하세요."
          w="100%"
          value={params.password}
          onChange={handleChange}
        />
        <Button fullWidth size="md" onClick={handleSubmit}>
          로그인
        </Button>
        <Flex justify={'center'} align={'center'} gap={5}>
          <Text c="gray" size="xs">
            계정이 없으신가요?
          </Text>
          <Anchor
            href="/signup"
            onClick={(e) => {
              e.preventDefault();
              navigate('/signup');
            }}
          >
            회원가입
          </Anchor>
        </Flex>
      </Flex>
    </Center>
  );
};

export default LoginPage;
