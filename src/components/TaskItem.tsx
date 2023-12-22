import { Container, Flex, Text } from '@mantine/core';
import { Task } from '../types/task.types';

type TaskItemProps = {
  task: Task;
};

const TaskItem = ({ task }: TaskItemProps) => {
  return (
    <Container fluid p="xs" w="100%">
      <Flex
        bg={task.color}
        p="sm"
        direction="column"
        style={{ borderRadius: '5px' }}
        gap="xs"
      >
        <Flex gap="xs">
          <Text size="sm" fw={400}>
            {task.subject}
          </Text>
        </Flex>
        {task.repeatingType !== 'single' && (
          <Flex justify="flex-start">
            <Text size="xs" c="gray.6">
              반복
            </Text>
          </Flex>
        )}
      </Flex>
    </Container>
  );
};

export default TaskItem;
