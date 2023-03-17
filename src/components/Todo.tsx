import { CheckBox } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';

const Todo = () => {
  return (
    <Stack direction="row">
      <CheckBox aria-label="todo" />
      <Typography>컬리에서 바나나랑 우유 사기</Typography>
    </Stack>
  );
};

export default Todo;
