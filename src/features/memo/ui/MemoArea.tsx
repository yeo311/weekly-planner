import { useRange } from '@/features/range';
import { FloatButton, Input, Spin, Typography } from 'antd';
import styled from 'styled-components';
import { useWeekMemo } from '../hoos/useWeekMemo';
import { DownOutlined, SaveOutlined, UpOutlined } from '@ant-design/icons';

export const MemoArea = () => {
  const { startDate } = useRange();
  const {
    currentMemo,
    memo,
    setMemo,
    isLoading,
    writeMemo,
    isShow,
    setIsShow,
  } = useWeekMemo(startDate);

  return (
    <>
      <MemoSection $isShow={isShow}>
        <Container>
          <Title>Memo</Title>
          <Spin spinning={isLoading}>
            <TextArea
              placeholder="메모를 입력하세요."
              defaultValue={currentMemo?.memo}
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
            />
          </Spin>
        </Container>
      </MemoSection>
      <FloatButton.Group>
        <FloatButton
          icon={<SaveOutlined />}
          htmlType="submit"
          type="primary"
          onClick={() => writeMemo(memo)}
          style={{ display: isShow ? 'block' : 'none' }}
        />
        <FloatButton
          icon={isShow ? <DownOutlined /> : <UpOutlined />}
          htmlType="reset"
          onClick={() => setIsShow((prev) => !prev)}
        />
      </FloatButton.Group>
    </>
  );
};

const MemoSection = styled.section<{ $isShow: boolean }>`
  flex: 1;
  display: ${({ $isShow }) => ($isShow ? 'flex' : 'none')};
  flex-direction: column;
  border-top: 1px solid #f0f0f0;
  padding: 10px;
`;

const TextArea = styled(Input.TextArea)`
  height: 100% !important;
  border-color: #f0f0f0 !important;
  box-shadow: none !important;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  .ant-spin-nested-loading {
    height: 100%;
  }
  .ant-spin-container {
    height: 100%;
  }
`;

const Title = styled(Typography.Text)`
  font-size: 16px;
  margin-bottom: 10px;
`;
