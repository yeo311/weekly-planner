import { createMemo, getMemo, updateMemo } from '@/entities/memo';
import { userState } from '@/shared';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { Dayjs } from 'dayjs';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';

export const useWeekMemo = (date: Dayjs) => {
  const uid = useAtomValue(userState);
  const queryClient = useQueryClient();
  const {
    data: currentMemo,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: ['memo', date.valueOf()],
    queryFn: () => getMemo(uid, date),
    enabled: !!uid,
  });
  const [memo, setMemo] = useState('');
  const [isShow, setIsShow] = useState(false);

  const { mutate: writeMemo } = useMutation({
    mutationFn: async (memo: string) => {
      if (!currentMemo) {
        await createMemo(uid, date, memo);
      } else {
        await updateMemo(uid, date, memo);
      }
    },
    onSuccess: () => {
      message.success('메모를 저장했습니다.');
      queryClient.invalidateQueries({ queryKey: ['memo', date.valueOf()] });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setMemo(currentMemo?.memo ?? '');
    }
  }, [currentMemo?.memo, isSuccess]);

  return {
    currentMemo,
    writeMemo,
    memo,
    setMemo,
    isLoading,
    isShow,
    setIsShow,
  };
};
