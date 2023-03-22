import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import useTodo from '../hooks/useTodo';
import { deleteDialogState } from '../recoil/modal';
import { RepetitiveTodoDeleteTypes } from '../types/todo';

const DeleteDialog = () => {
  const [dialog, setDialog] = useRecoilState(deleteDialogState);
  const [repetitiveTodoDeleteType, setRepetitiveTodoDeleteType] =
    useState<RepetitiveTodoDeleteTypes>('only');

  const { fetchTodos, deleteTodo, cleanTodos } = useTodo();

  const handleClose = () => {
    setDialog({ isOpen: false, targetTodo: null });
  };

  const handleClickDelete = () => {
    if (!dialog.targetTodo) return;
    deleteTodo(dialog.targetTodo, repetitiveTodoDeleteType).then(() => {
      if (dialog.targetTodo?.repeatingType === 'single') {
        !!dialog.targetTodo && fetchTodos(dialog.targetTodo?.date);
      } else {
        cleanTodos();
      }
      handleClose();
    });
  };

  return (
    <Dialog open={dialog.isOpen} onClose={handleClose}>
      <DialogTitle>{'할일을 삭제하시겠습니까?'}</DialogTitle>
      <DialogContent>
        <DialogContentText>삭제하면 복구할 수 없습니다.</DialogContentText>
        {!!dialog.targetTodo &&
          dialog.targetTodo?.repeatingType !== 'single' && (
            <RadioGroup
              value={repetitiveTodoDeleteType}
              onChange={(_, v) => {
                setRepetitiveTodoDeleteType(v as RepetitiveTodoDeleteTypes);
              }}
            >
              <FormControlLabel
                value="only"
                control={<Radio />}
                label="이 할일만"
              />
              <FormControlLabel
                value="after"
                control={<Radio />}
                label="이번 및 향후 할일"
              />
              <FormControlLabel
                value="all"
                control={<Radio />}
                label="모든 할일"
              />
            </RadioGroup>
          )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClickDelete}>삭제</Button>
        <Button onClick={handleClose}>취소</Button>
      </DialogActions>
    </Dialog>
  );
};
export default DeleteDialog;
