import { IconButton, Stack, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TodayIcon from '@mui/icons-material/Today';
import { blue } from '@mui/material/colors';

const WeekTitle = () => {
  return (
    <Stack direction="row" spacing={3} alignItems="center">
      <TodayIcon fontSize="large" sx={{ color: blue[800] }} />
      <IconButton aria-label="back">
        <ArrowBackIosNewIcon />
      </IconButton>
      <IconButton aria-label="forward">
        <ArrowForwardIosIcon />
      </IconButton>
      <Typography variant="h6">2023.03.11 - 2023.03.17</Typography>
    </Stack>
  );
};

export default WeekTitle;
