import { BatchDTO } from '@/entities/batch/model/types';
import { axiosInstance } from '@/shared/service/instance';

interface FetchBatchesParams {
  pageParam?: number; // номер страницы для useInfiniteQuery
  statusParams?: string;
  take?: number;
}

export const fetchBatches = async ({
  pageParam = 0,
  statusParams = '',
  take,
}: FetchBatchesParams): Promise<{
  batches: BatchDTO[];
  nextPage: number | undefined;
}> => {
  const params = new URLSearchParams();
  if (take) {
    const skip = pageParam * take;
    params.set('take', take.toString());
    params.set('skip', skip.toString());
  }

  const { data } = await axiosInstance.get(`/batch?${params.toString()}&${statusParams}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_READ_KEY}`,
    },
  });

  if (!data) {
    throw new Error('Ошибка при загрузке партий');
  }

  const hasMore = data.length === take;
  return {
    batches: data,
    nextPage: hasMore ? pageParam + 1 : undefined,
  };
};
