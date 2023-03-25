import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { useState } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import useTodo from '../../hooks/useTodo';
import { dialogState } from '../../recoil/modal';
import { RepetitiveTodoDeleteTypes } from '../../types/todo';
import MarginBox from '../MarginBox';

const DeleteDialog = () => {
  const dialog = useRecoilValue(dialogState);
  const resetDialogState = useResetRecoilState(dialogState);
  const [repetitiveTodoDeleteType, setRepetitiveTodoDeleteType] =
    useState<RepetitiveTodoDeleteTypes>('only');

  const { deleteTodo, fetchTodoById, setTodos } = useTodo();

  const handleClickDelete = async () => {
    if (!dialog.targetTodo) return;
    try {
      await deleteTodo(dialog.targetTodo, repetitiveTodoDeleteType);
      if (
        !!dialog.targetTodo.repeatingType &&
        dialog.targetTodo.repeatingType !== 'single' &&
        repetitiveTodoDeleteType !== 'all'
      ) {
        fetchTodoById(dialog.targetTodo.id, dialog.targetTodo.repeatingType);
      } else {
        setTodos((prev) => {
          const newData: typeof prev = {};
          Object.keys(prev).forEach((keyStr) => {
            const key = Number(keyStr);
            if (
              prev[key].findIndex((t) => t.id === dialog.targetTodo?.id) === -1
            )
              return;
            newData[key] = prev[key].filter(
              (t) => t.id !== dialog.targetTodo?.id
            );
          });
          return { ...prev, ...newData };
        });
      }

      resetDialogState();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Dialog
      open={dialog.isOpen && dialog.type === 'delete'}
      onClose={resetDialogState}
      fullWidth
    >
      <DialogTitle>{'할일을 삭제하시겠습니까?'}</DialogTitle>
      <DialogContent>
        <DialogContentText>삭제하면 복구할 수 없습니다.</DialogContentText>
        {!!dialog.targetTodo?.repeatingType &&
          dialog.targetTodo.repeatingType !== 'single' && (
            <>
              <MarginBox />
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
            </>
          )}
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button onClick={handleClickDelete}>삭제</Button>
        <Button onClick={resetDialogState}>취소</Button>
      </DialogActions>
    </Dialog>
  );
};
export default DeleteDialog;
