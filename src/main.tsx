import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import { RecoilURLSyncJSON } from 'recoil-sync';

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import 'swiper/css';
import { createTheme, MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SignUpPage from './pages/SignUpPage';
import { AuthContextProvider } from './contexts/AuthContext';
import { DatesProvider } from '@mantine/dates';
import 'dayjs/locale/ko';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignUpPage />,
  },
]);

const theme = createTheme({
  fontFamily: 'Noto Sans KR, sans-serif',
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchInterval: false,
      refetchOnMount: false,
      retry: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RecoilRoot>
    <RecoilURLSyncJSON location={{ part: 'queryParams' }}>
      <MantineProvider theme={theme}>
        <DatesProvider settings={{ locale: 'ko' }}>
          <QueryClientProvider client={queryClient}>
            <AuthContextProvider>
              <RouterProvider router={router} />
            </AuthContextProvider>
          </QueryClientProvider>
        </DatesProvider>
      </MantineProvider>
    </RecoilURLSyncJSON>
  </RecoilRoot>
);
