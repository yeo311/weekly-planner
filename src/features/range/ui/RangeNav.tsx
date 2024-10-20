import styled from 'styled-components';
import { useRange } from '../hooks/useRange';
import { Button, DatePicker, Typography } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

export const RangeNav = () => {
  const { startDate, endDate, setRange } = useRange();

  const handlePrev = () => {
    setRange(startDate.subtract(1, 'week'), endDate.subtract(1, 'week'));
  };

  const handleNext = () => {
    setRange(startDate.add(1, 'week'), endDate.add(1, 'week'));
  };

  return (
    <RangeNavContainer>
      <Button icon={<LeftOutlined />} onClick={handlePrev} />
      <RangeNavText>
        {`${startDate.format('YYYY-MM-DD')} ~ ${endDate.format('YYYY-MM-DD')}`}
      </RangeNavText>

      <Button icon={<RightOutlined />} onClick={handleNext} />
      <DatePicker
        onChange={(date) => {
          if (!date) return;
          setRange(
            date.startOf('week').add(1, 'day').startOf('day') as dayjs.Dayjs,
            date.endOf('week').add(1, 'day').endOf('day') as dayjs.Dayjs
          );
        }}
      />
    </RangeNavContainer>
  );
};

const RangeNavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

const RangeNavText = styled(Typography.Text)`
  font-size: 1rem;
`;
