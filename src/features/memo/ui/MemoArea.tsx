import { useRange } from '@/features/range';
import { SaveOutlined, RedoOutlined } from '@ant-design/icons';
import { FloatButton, Input, Spin } from 'antd';
import styled from 'styled-components';
import { useWeekMemo } from '../hoos/useWeekMemo';

export const MemoArea = () => {
  const { startDate } = useRange();
  const { currentMemo, writeMemo, memo, setMemo, isLoading } =
    useWeekMemo(startDate);

  return (
    <Container>
      <Spin spinning={isLoading}>
        <TextArea
          placeholder="메모를 입력하세요."
          defaultValue={currentMemo?.memo}
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
        />
        <FloatButton.Group>
          <FloatButton icon={<RedoOutlined />} htmlType="reset" />
          <FloatButton
            icon={<SaveOutlined />}
            htmlType="submit"
            type="primary"
            onClick={() => writeMemo(memo)}
          />
        </FloatButton.Group>
      </Spin>
    </Container>
  );
};

const TextArea = styled(Input.TextArea)`
  height: 100% !important;
  border-color: #f0f0f0 !important;
  box-shadow: none !important;
`;

const Container = styled.div`
  height: 100%;
  .ant-spin-nested-loading {
    height: 100%;
  }
  .ant-spin-container {
    height: 100%;
  }
`;
