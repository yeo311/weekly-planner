import { Button } from 'antd';
import { RangeNav } from './RangeNav';
import styled from 'styled-components';
import { useRange } from '../hooks/useRange';
import dayjs from 'dayjs';
import { auth } from '@/shared';

export const Header = () => {
  const { setRange } = useRange();

  const handleThisWeek = () => {
    setRange(dayjs().startOf('week'), dayjs().endOf('week'));
  };

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <HeaderContainer>
      <Button onClick={handleThisWeek}>이번 주</Button>
      <RangeNav />
      <Button onClick={handleLogout}>로그아웃</Button>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
  background-color: #ffffff;
`;
