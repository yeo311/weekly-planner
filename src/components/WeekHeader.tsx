import { Container, Flex, Text } from '@mantine/core';
import { Dayjs } from 'dayjs';

type WeekHeaderProps = {
  days: Dayjs[];
};

const WeekHeader = ({ days }: WeekHeaderProps) => {
  const year = days[0].year();
  const monthName = days[0].format('MMMM');

  return (
    <Container fluid>
      <Text c="gray" size="sm">{`${monthName} ${year}`}</Text>
      <Flex justify="space-between" align="center" h={'30px'}>
        {days.map((day) => (
          <Flex key={day.format('YYYY-MM-DD')} w="100%" justify="center">
            <Text size="sm">{`${day.format('DD')} ${day.format('ddd')}`}</Text>
          </Flex>
        ))}
      </Flex>
    </Container>
  );
};

export default WeekHeader;
