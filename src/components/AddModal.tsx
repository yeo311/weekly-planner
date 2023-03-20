import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import useTodo from '../hooks/useTodo';
import { userState } from '../recoil/user';
import { addModalState } from '../recoil/modal';
import { addFirebaseTodo } from '../utils/firebase';
import { RepeatingTypes } from '../types/todo';
import { dayArr } from '../utils/date';

const AddModal = () => {
  const [modalState, setModalState] = useRecoilState(addModalState);
  const [value, setValue] = useState<string>('');
  const [showError, setShowError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [repeatingType, setRepeatingType] = useState<RepeatingTypes | 'none'>(
    'none'
  );
  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isShowModal: false }));
  };
  const { fetchTodos } = useTodo();

  const loginData = useRecoilValue(userState);

  const handleRepeatingTypeChange = (event: SelectChangeEvent) => {
    setRepeatingType(event.target.value as RepeatingTypes);
  };

  const handleClickSubmit = async () => {
    if (!value) {
      setShowError(true);
      return;
    }
    try {
      setIsLoading(true);
      await addFirebaseTodo(loginData.uid, modalState.targetDate, value);
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
        <FormControl variant="standard">
          <InputLabel id="repeating-type">반복</InputLabel>
          <Select
            labelId="repeating-type"
            label="repeat"
            value={repeatingType}
            onChange={handleRepeatingTypeChange}
          >
            <MenuItem value="none">반복 안함</MenuItem>
            <MenuItem value="weekly">
              매주 {`${dayArr[modalState.targetDate.getDay()]}요일`}
            </MenuItem>
            <MenuItem value="daily">매일</MenuItem>
            <MenuItem value="weekdays">주중 매일</MenuItem>
            <MenuItem value="monthly">
              매달 {`${modalState.targetDate.getDate()}일`}
            </MenuItem>
          </Select>
        </FormControl>
        <Box sx={{ height: 20 }} />
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
