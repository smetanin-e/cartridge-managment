import { ReplacementDTO } from '@/entities/replacement/model/types';
import { axiosInstance } from '@/shared/service/instance';

interface FetchReplacementsParams {
  pageParam?: number; // номер страницы для useInfiniteQuery
  search?: string; // строка поиска (только для админа)
}

export const fetchReplacements = async ({
  pageParam = 0,
  search = '',
}: FetchReplacementsParams): Promise<{
  replacements: ReplacementDTO[];
  nextPage: number | undefined;
}> => {
  const take = 10;
  const skip = pageParam * take;
  const params = new URLSearchParams();
  params.set('take', take.toString());
  params.set('skip', skip.toString());

  if (search.trim()) params.set('search', search.trim());
  const { data } = await axiosInstance.get<ReplacementDTO[]>(`/replacement?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_READ_KEY}`,
    },
  });

  if (!data) {
    throw new Error('Ошибка при загрузке списка замен');
  }

  const hasMore = data.length === take;
  return {
    replacements: data,
    nextPage: hasMore ? pageParam + 1 : undefined,
  };
};
