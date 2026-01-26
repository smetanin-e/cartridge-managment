import { fetchBatches } from '@/features/batch/model/fetch-batches';
import { BatchStatus } from '@prisma/client';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useGetBatches = (statuses?: BatchStatus[], take?: number) => {
  const statusesString = statuses?.length
    ? statuses.map((s) => `status=${encodeURIComponent(s)}`).join('&')
    : '';

  const query = useInfiniteQuery({
    initialPageParam: 0,
    queryKey: ['batches', { statuses }],
    queryFn: ({ pageParam = 0 }) => fetchBatches({ pageParam, statusParams: statusesString, take }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  return {
    ...query,
    batches: query.data?.pages.flatMap((page) => page.batches) ?? [],
  };
};
