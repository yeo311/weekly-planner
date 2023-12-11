import { Flex, Image, Title } from '@mantine/core';

const Logo = () => {
  return (
    <Flex align="center" gap="xs">
      <Image src="/icons/icon-48.png" w={48} />
      <Title ff="'Dancing Script', cursive">Weekly Planner</Title>
    </Flex>
  );
};

export default Logo;
