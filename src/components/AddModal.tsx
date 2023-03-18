import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import useTodo from '../hooks/useTodo';
import { loginState } from '../recoil/loginState';
import { addModalState } from '../recoil/modalState';
import { addTodo } from '../utils/firebase';

const AddModal = () => {
  const [modalState, setModalState] = useRecoilState(addModalState);
  const [value, setValue] = useState<string>('');
  const [showError, setShowError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isShowModal: false }));
  };
  const { fetchTodos } = useTodo();

  const loginData = useRecoilValue(loginState);

  const handleClickSubmit = async () => {
    if (!value) {
      setShowError(true);
      return;
    }
    try {
      setIsLoading(true);
      await addTodo(loginData.uid, modalState.targetDate, value);
      setIsLoading(false);
      closeModal();
      fetchTodos(modalState.targetDate);
    } catch (e) {
      console.error(e);
      window.alert('에러가 발생했습니다');
    }
  };

  return (
    <Modal open={modalState.isShowModal} onClose={closeModal}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: 400,
          width: '80%',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h6">할일 추가</Typography>
        <TextField
          label="할일"
          variant="standard"
          fullWidth
          onChange={(e) => setValue(e.target.value)}
        />
        <Box sx={{ height: 20 }} />
        {showError && (
          <>
            <Alert severity="error">할일을 입력하세요.</Alert>
            <Box sx={{ height: 20 }} />
          </>
        )}
        <Button
          variant="contained"
          sx={{ alignSelf: 'flex-end' }}
          onClick={handleClickSubmit}
        >
          추가하기
          {isLoading && (
            <CircularProgress
              color="inherit"
              size={16}
              sx={{ marginLeft: '10px' }}
            />
          )}
        </Button>
      </Box>
    </Modal>
  );
};
export default AddModal;
