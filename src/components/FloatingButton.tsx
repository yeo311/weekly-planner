import { Button } from '@mantine/core';
import { MouseEventHandler } from 'react';

type FloatingButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
};

const FloatingButton = ({ onClick, children }: FloatingButtonProps) => {
  return (
    <Button
      pos="fixed"
      bottom={20}
      right={20}
      p={0}
      h={50}
      w={50}
      style={{ zIndex: 10, borderRadius: '50%' }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default FloatingButton;
