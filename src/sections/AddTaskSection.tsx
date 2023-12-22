import {
  Button,
  ColorPicker,
  Drawer,
  Select,
  Text,
  Textarea,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import FloatingButton from '../components/FloatingButton';
import { IconPlus } from '@tabler/icons-react';
import { DatePickerInput, DateValue } from '@mantine/dates';
import { useState } from 'react';
import { RepeatingTypes } from '../types/task.types';

type InputValues = {
  subject: string;
  color: string;
  repeatType: RepeatingTypes;
  date: DateValue;
  startDate: DateValue;
  endDate: DateValue;
};

const AddTaskSection = () => {
  const [opened, { open, close }] = useDisclosure();
  const [values, setValues] = useState<InputValues>({
    subject: '',
    color: '#d5eecf',
    repeatType: 'single',
    date: new Date(),
    startDate: new Date(),
    endDate: null,
  });

  const handleChangeSubject = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValues((prev) => ({ ...prev, subject: e.target.value }));
  };

  const handleSubmit = () => {
    console.log(values);
  };

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        title="할일 추가"
        position="right"
      >
        <Textarea
          label="내용"
          name="subject"
          value={values.subject}
          onChange={handleChangeSubject}
        />
        <Text size="sm" fw={500} mt={10} mb={5}>
          색상
        </Text>
        <ColorPicker
          value={values.color}
          onChange={(value) => setValues((prev) => ({ ...prev, color: value }))}
          format="hex"
          fullWidth
          swatchesPerRow={6}
          swatches={[
            '#d5eecf',
            '#f8f7af',
            '#ffcba3',
            '#ffa4a4',
            '#ebccff',
            '#cce9ff',
          ]}
        />
        <Select
          mt={10}
          label="반복"
          data={[
            { value: 'single', label: '반복 안함' },
            { value: 'weekly', label: '매주 같은 요일' },
            { value: 'daily', label: '매일' },
            { value: 'weekdays', label: '주중 매일' },
            { value: 'monthly', label: '매월 같은 날짜' },
          ]}
          value={values.repeatType}
          onChange={(value) =>
            setValues((prev) => ({
              ...prev,
              repeatType: value as RepeatingTypes,
            }))
          }
        />
        <DatePickerInput
          label="날짜"
          mt={10}
          display={values.repeatType !== 'single' ? 'none' : ''}
          value={values.date}
          onChange={(date) => setValues((prev) => ({ ...prev, date }))}
        />
        <div style={{ display: values.repeatType === 'single' ? 'none' : '' }}>
          <DatePickerInput
            label="시작일"
            mt={10}
            value={values.startDate}
            onChange={(startDate) =>
              setValues((prev) => ({ ...prev, startDate }))
            }
          />
          <DatePickerInput
            label="종료일"
            mt={10}
            description="선택하지 않으면 계속 반복"
            value={values.endDate}
            onChange={(endDate) => setValues((prev) => ({ ...prev, endDate }))}
          />
        </div>
        <Button mt={20} size="md" fullWidth onClick={handleSubmit}>
          추가하기
        </Button>
      </Drawer>

      <FloatingButton onClick={open}>
        <IconPlus size={24} />
      </FloatingButton>
    </>
  );
};

export default AddTaskSection;
