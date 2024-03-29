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
import useTodo from '../../hooks/useTodo';
import { userState } from '../../recoil/user';
import { addModalState } from '../../recoil/modal';
import { addTodoItem } from '../../firebase/create';
import { RepeatingTypes, TodoColors } from '../../types/todo';
import { dayArr } from '../../utils/date';
import { MobileDatePicker } from '@mui/x-date-pickers';
import MarginBox from '../MarginBox';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Circle } from '@mui/icons-material';
dayjs.extend(utc);

const AddModal = () => {
  const [modalState, setModalState] = useRecoilState(addModalState);
  const [value, setValue] = useState<string>('');
  const [showError, setShowError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [repeatingType, setRepeatingType] = useState<RepeatingTypes>('single');
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [color, setColor] = useState<TodoColors>(TodoColors.Green);

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isShowModal: false }));
    setRepeatingType('single');
    setEndDate(null);
  };
  const { fetchTodoById, getTodos } = useTodo();

  const loginData = useRecoilValue(userState);

  const handleRepeatingTypeChange = (event: SelectChangeEvent) => {
    setRepeatingType(event.target.value as RepeatingTypes);
  };

  const handleColorChange = (event: SelectChangeEvent) => {
    setColor(event.target.value as TodoColors);
  };

  const handleClickSubmit = async () => {
    if (!value) {
      setShowError(true);
      return;
    }
    try {
      setIsLoading(true);
      const curTodos = getTodos(modalState.targetDate);
      const docRef = await addTodoItem(loginData.uid, {
        date: modalState.targetDate,
        subject: value,
        color,
        startDate: modalState.targetDate,
        endDate:
          repeatingType && repeatingType !== 'single' && endDate
            ? endDate.utc(true).toDate()
            : new Date('2099-12-31'),
        repeatingType,
        repeatingNumber:
          repeatingType === 'monthly'
            ? modalState.targetDate.getDate()
            : repeatingType === 'weekly'
            ? modalState.targetDate.getDay()
            : 0,
        sortIdx: curTodos.length,
      });

      fetchTodoById(docRef.id, repeatingType);
      setIsLoading(false);
      closeModal();
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
        <MarginBox />
        <FormControl variant="standard">
          <InputLabel id="color">색상</InputLabel>
          <Select
            labelId="color"
            label="color"
            value={color}
            onChange={handleColorChange}
          >
            {(Object.keys(TodoColors) as Array<keyof typeof TodoColors>).map(
              (key) => (
                <MenuItem key={TodoColors[key]} value={TodoColors[key]}>
                  <Circle sx={{ color: TodoColors[key] }} />
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>
        <MarginBox />
        <FormControl variant="standard">
          <InputLabel id="repeating-type">반복</InputLabel>
          <Select
            labelId="repeating-type"
            label="repeat"
            value={repeatingType}
            onChange={handleRepeatingTypeChange}
          >
            <MenuItem value="single">반복 안함</MenuItem>
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
        <MarginBox />
        <MobileDatePicker
          label="종료일 (선택 하지 않으면 계속 반복)"
          sx={{ display: repeatingType === 'single' ? 'none' : 'box' }}
          value={endDate}
          onChange={(newValue) => setEndDate(newValue)}
        />
        <MarginBox />
        {showError && (
          <>
            <Alert severity="error">할일을 입력하세요.</Alert>
            <MarginBox />
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
