import { MemoArea, useAuthStateChange } from '@/features';
import { Header } from '@/features/range/ui/Header';
import { WeekTasks } from '@/features/task/ui/WeekTasks';
import styled from 'styled-components';

export const PlannerPage = () => {
  useAuthStateChange();
  return (
    <Layout>
      <Header />
      <Content>
        <WeekTasks />
      </Content>
      <MemoSection>
        <MemoArea />
      </MemoSection>
    </Layout>
  );
};

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Content = styled.main`
  flex: 2;
  display: flex;
  flex-direction: column;
`;

const MemoSection = styled.section`
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  border-top: 1px solid #f0f0f0;
  padding: 10px;
`;
