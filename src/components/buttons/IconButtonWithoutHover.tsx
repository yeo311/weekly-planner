import { IconButton } from '@mui/material';
import { MouseEvent, ReactNode } from 'react';

interface IconButtonWithoutHoverProps {
  children: ReactNode;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

const IconButtonWithoutHover = ({
  children,
  onClick,
}: IconButtonWithoutHoverProps) => {
  return (
    <IconButton
      sx={{
        '&:hover': {
          backgroundColor: 'transparent',
        },
      }}
      onClick={onClick}
    >
      {children}
    </IconButton>
  );
};

export default IconButtonWithoutHover;
