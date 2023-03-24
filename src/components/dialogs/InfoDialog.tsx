import styled from '@emotion/styled';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Typography,
} from '@mui/material';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { dialogState, DialogTypes } from '../../recoil/modal';
import CloseButton from '../buttons/CloseButton';
import DeleteButton from '../buttons/DeleteButton';
import EditButton from '../buttons/EditButton';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import { Circle } from '@mui/icons-material';
import { TodoColors } from '../../types/todo';
import MarginBox from '../MarginBox';

const StyledIconBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 20px;
`;

const StyledInfoBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const StyledLabelBox = styled.div`
  flex: 0 0 15%;
`;
const StyledContentBox = styled.div`
  flex: 1 1 auto;
`;

const InfoDialog = () => {
  const [{ isOpen, type, targetTodo }, setDialog] = useRecoilState(dialogState);
  const resetDialogState = useResetRecoilState(dialogState);

  const changeDialogTypeTo = (type: DialogTypes) =>
    setDialog((prevData) => ({ ...prevData, type }));

  const openEditDialog = () => changeDialogTypeTo('edit');

  const handleClickDeleteButton = () => changeDialogTypeTo('delete');
  console.log('info', targetTodo);
  if (!targetTodo) return null;

  const { subject, color } = targetTodo;

  return (
    <Dialog
      open={isOpen && type === 'info'}
      onClose={resetDialogState}
      fullWidth
    >
      <StyledIconBox>
        <EditButton onClick={openEditDialog} />
        <DeleteButton onClick={handleClickDeleteButton} />
        <CloseButton onClick={resetDialogState} />
      </StyledIconBox>
      <DialogContent>
        <StyledInfoBox>
          <StyledLabelBox />
          <StyledContentBox>
            <Typography variant="h6">{subject}</Typography>
          </StyledContentBox>
        </StyledInfoBox>
        <MarginBox />
        <StyledInfoBox>
          <StyledLabelBox>
            <ColorLensOutlinedIcon />
          </StyledLabelBox>
          <StyledContentBox>
            <Circle sx={{ color: color || TodoColors.Green }} />
          </StyledContentBox>
        </StyledInfoBox>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button onClick={resetDialogState}>취소</Button>
      </DialogActions>
    </Dialog>
  );
};

export default InfoDialog;
