import { route } from '@/pages';
import { RouterProvider } from 'react-router-dom';
import Providers from './providers';
import weekday from 'dayjs/plugin/weekday';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import localeData from 'dayjs/plugin/localeData';
import updateLocale from 'dayjs/plugin/updateLocale';

dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(updateLocale);
dayjs.locale('ko', { weekStart: 1 });
dayjs.updateLocale('ko', { weekStart: 1 });

import '@/shared/style/normalize.css';

const App = () => {
  return (
    <Providers>
      <RouterProvider router={route} />
    </Providers>
  );
};

export default App;
