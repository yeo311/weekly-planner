import { createBrowserRouter } from 'react-router-dom';
import { LazyLoginPage } from './auth';
import { PlannerPage } from './planner';

export const route = createBrowserRouter([
  {
    path: '/',
    element: <PlannerPage />,
  },
  {
    path: '/login',
    element: <LazyLoginPage />,
  },
  {
    path: '*',
    element: <div>404 Not Found</div>,
  },
]);
