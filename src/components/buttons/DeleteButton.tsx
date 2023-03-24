import IconButtonWithoutHover from './IconButtonWithoutHover';
import { MouseEvent } from 'react';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

interface DeleteButtonProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

const DeleteButton = ({ onClick }: DeleteButtonProps) => {
  return (
    <IconButtonWithoutHover onClick={onClick}>
      <DeleteOutlineOutlinedIcon />
    </IconButtonWithoutHover>
  );
};

export default DeleteButton;
