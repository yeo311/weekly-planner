import { useAuthStateChange } from '@/features';
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
    </Layout>
  );
};

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Content = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`;
