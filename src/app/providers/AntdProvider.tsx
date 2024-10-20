import { ConfigProvider } from 'antd';
import ko_KR from 'antd/lib/locale/ko_KR';

export const AntdProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ConfigProvider
      locale={ko_KR}
      theme={{
        token: {
          fontFamily:
            'NanumSquareRound, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji',
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};
