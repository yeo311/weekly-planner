import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import IconButtonWithoutHover from './IconButtonWithoutHover';
import { MouseEvent } from 'react';

interface EditButtonProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

const EditButton = ({ onClick }: EditButtonProps) => {
  return (
    <IconButtonWithoutHover onClick={onClick}>
      <EditOutlinedIcon />
    </IconButtonWithoutHover>
  );
};

export default EditButton;
