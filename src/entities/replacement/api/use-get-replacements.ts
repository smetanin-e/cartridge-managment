import { useInfiniteQuery } from '@tanstack/react-query';
import { useDebounce } from 'react-use';
import React from 'react';
import { fetchReplacements } from '@/features/replacement/model/fetch-replacements';

export const useGetReplacements = (search?: string) => {
  const [debouncedSearch, setDebouncedSearch] = React.useState(search);
  // Делаем debounce на входной строке
  useDebounce(
    () => {
      setDebouncedSearch(search);
    },
    500,
    [search],
  );

  return useInfiniteQuery({
    initialPageParam: 0,
    queryKey: ['replacements', debouncedSearch],
    queryFn: ({ pageParam = 0 }) => fetchReplacements({ pageParam, search: debouncedSearch }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
};
