import { MouseEvent } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import IconButtonWithoutHover from './IconButtonWithoutHover';

interface ArrowIconProps {
  direction: 'left' | 'right';
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

const ArrowIconButton = ({ direction, onClick }: ArrowIconProps) => {
  return (
    <IconButtonWithoutHover onClick={onClick}>
      {direction === 'left' ? <ArrowBackIosNewIcon /> : <ArrowForwardIosIcon />}
    </IconButtonWithoutHover>
  );
};

export default ArrowIconButton;
