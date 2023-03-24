import styled from '@emotion/styled';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { dialogState, DialogTypes } from '../../recoil/modal';
import CloseButton from '../buttons/CloseButton';
import DeleteButton from '../buttons/DeleteButton';
import MarginBox from '../MarginBox';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import { Circle } from '@mui/icons-material';
import { TodoColors } from '../../types/todo';
import { useEffect, useState } from 'react';
import { updateTodoItem } from '../../firebase/update';
import { userState } from '../../recoil/user';
import useTodo from '../../hooks/useTodo';

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

const EditDialog = () => {
  const [{ isOpen, type, targetTodo }, setDialog] = useRecoilState(dialogState);
  const resetDialogState = useResetRecoilState(dialogState);
  const [selectColor, setSelectColor] = useState<TodoColors>(
    targetTodo?.color || TodoColors.Green
  );
  const [subject, setSubject] = useState<string>(targetTodo?.subject || '');
  const user = useRecoilValue(userState);
  const { fetchTodos, cleanTodos } = useTodo();

  const changeDialogTypeTo = (type: DialogTypes) =>
    setDialog((prevData) => ({ ...prevData, type }));

  const handleClickDeleteButton = () => changeDialogTypeTo('delete');

  const handleChangeColor = (event: SelectChangeEvent<TodoColors>) => {
    setSelectColor(event.target.value as TodoColors);
  };

  const handleChangeSubject = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value);
  };

  const handleSubmit = () => {
    if (!targetTodo) return;
    updateTodoItem(user.uid, {
      ...targetTodo,
      subject,
      color: selectColor,
    }).then(() => {
      if (targetTodo.repeatingType === 'single') {
        fetchTodos(targetTodo.date);
      } else {
        cleanTodos();
      }
      resetDialogState();
    });
  };

  useEffect(() => {
    if (!targetTodo) return;
    setSubject(targetTodo.subject);
    setSelectColor(targetTodo.color || TodoColors.Green);
  }, [targetTodo]);

  if (!targetTodo) return null;

  return (
    <Dialog
      open={isOpen && type === 'edit'}
      onClose={resetDialogState}
      fullWidth
    >
      <StyledIconBox>
        <DeleteButton onClick={handleClickDeleteButton} />
        <CloseButton onClick={resetDialogState} />
      </StyledIconBox>
      <DialogContent>
        <StyledInfoBox>
          <StyledLabelBox />
          <StyledContentBox>
            <TextField
              value={subject}
              variant="standard"
              fullWidth
              onChange={handleChangeSubject}
            />
          </StyledContentBox>
        </StyledInfoBox>
        <MarginBox />
        <StyledInfoBox>
          <StyledLabelBox>
            <ColorLensOutlinedIcon />
          </StyledLabelBox>
          <StyledContentBox>
            <FormControl variant="standard">
              <Select
                labelId="color"
                label="color"
                value={selectColor}
                onChange={handleChangeColor}
              >
                {(
                  Object.keys(TodoColors) as Array<keyof typeof TodoColors>
                ).map((key) => (
                  <MenuItem value={TodoColors[key]}>
                    <Circle sx={{ color: TodoColors[key] }} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </StyledContentBox>
        </StyledInfoBox>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button variant="contained" onClick={handleSubmit}>
          저장
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
