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

const LoginPage = () => {
  const userIcon = <IconUser size={20} />;
  const lockIcon = <IconLock size={20} />;

  return (
    <Center h="100vh">
      <Flex w={'100%'} maw={500} direction="column" align={'center'} gap="md">
        <Title ff="'Dancing Script', cursive">Weekly Planner</Title>
        <Text c="gray" size="sm">
          위클리 플래너에 로그인하세요
        </Text>
        <TextInput
          size="md"
          leftSection={userIcon}
          placeholder="이메일을 입력하세요."
          w="100%"
        />
        <PasswordInput
          size="md"
          leftSection={lockIcon}
          placeholder="비밀번호를 입력하세요."
          w="100%"
        />
        <Button fullWidth size="md">
          로그인
        </Button>
        <Text c="gray" size="xs">
          계정이 없으신가요?
        </Text>
      </Flex>
    </Center>
  );
};

export default LoginPage;
