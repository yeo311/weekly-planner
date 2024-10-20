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
        <div>
          <WeekTasks />
        </div>
      </Content>
    </Layout>
  );
};

const Layout = styled.div`
  display: flex;
  flex-direction: column;
`;

const Content = styled.main`
  flex: 1;
`;
