import { ConfigProvider } from 'antd';
import ko_KR from 'antd/lib/locale/ko_KR';

export const AntdProvider = ({ children }: { children: React.ReactNode }) => {
  return <ConfigProvider locale={ko_KR}>{children}</ConfigProvider>;
};
