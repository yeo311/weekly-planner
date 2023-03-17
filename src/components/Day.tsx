import { Paper, Stack, Typography } from '@mui/material';
import Todo from './Todo';

const Day = () => {
  return (
    <Paper elevation={3} sx={{ padding: '10px', width: '200px' }}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography variant="h6">월</Typography>
        <Typography>11</Typography>
      </Stack>
      <Stack>
        <Todo />
        <Todo />
        <Todo />
        <Todo />
        <Todo />
      </Stack>
    </Paper>
  );
};

export default Day;
