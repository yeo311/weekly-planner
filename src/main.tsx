import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Main from './pages/Main';
import LoginPage from './pages/LoginPage';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { RecoilURLSyncJSON } from 'recoil-sync';

import '@mantine/core/styles.css';
import { createTheme, MantineProvider } from '@mantine/core';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
]);

const theme = createTheme({
  fontFamily: 'Noto Sans KR, sans-serif',
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RecoilRoot>
    <RecoilURLSyncJSON location={{ part: 'queryParams' }}>
      <MantineProvider theme={theme}>
        <RouterProvider router={router} />
      </MantineProvider>
    </RecoilURLSyncJSON>
  </RecoilRoot>
);
