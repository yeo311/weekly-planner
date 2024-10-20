import { AntdProvider } from './\bAntdProvider';
import { QueryProvider } from './QueryProvider';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <AntdProvider>{children}</AntdProvider>
    </QueryProvider>
  );
};

export default Providers;
