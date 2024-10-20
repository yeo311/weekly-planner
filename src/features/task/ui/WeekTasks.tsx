import { useRange } from '@/features/range';
import { getWeekDays } from '../utils/process';
import { TaskList } from './TaskList';
import styled from 'styled-components';

export const WeekTasks = () => {
  const { startDate, endDate } = useRange();
  const currentWeekDays = getWeekDays(startDate, endDate);
  return (
    <Container>
      {currentWeekDays.map((day) => (
        <TaskList key={day.valueOf()} date={day} />
      ))}
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  padding: 10px;
  width: 100%;
  justify-content: space-between;
  flex: 1;

  & > div:not(:last-child) {
    border-right: 1px solid #f0f0f0;
  }
`;
