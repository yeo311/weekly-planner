import IconButtonWithoutHover from './IconButtonWithoutHover';
import { MouseEvent } from 'react';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

interface CloseButtonProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

const CloseButton = ({ onClick }: CloseButtonProps) => {
  return (
    <IconButtonWithoutHover onClick={onClick}>
      <CloseOutlinedIcon />
    </IconButtonWithoutHover>
  );
};

export default CloseButton;
