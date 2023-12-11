import { Button, Container, Flex, Group } from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';
import Logo from '../components/Logo';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/init';

const HeaderSection = () => {
  const handleLogout = () => {
    confirm('로그아웃 하시겠습니까?') && signOut(auth);
  };

  return (
    <Container fluid>
      <Flex justify="space-between" align="center" h={60}>
        <Logo />
        <Group justify="center">
          <Button
            variant="transparent"
            size="sm"
            c="gray"
            onClick={handleLogout}
          >
            <IconLogout />
            로그아웃
          </Button>
        </Group>
      </Flex>
    </Container>
  );
};

export default HeaderSection;
