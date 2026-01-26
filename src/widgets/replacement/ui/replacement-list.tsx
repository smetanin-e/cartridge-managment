'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, Input } from '@/shared/components/ui';
import { ClearButton, LoadingBounce, ShowMore } from '@/shared/components';
import { Search } from 'lucide-react';
import { ReplacementModal } from '@/features/replacement/ui';

import { useGetReplacements } from '@/entities/replacement/api/use-get-replacements';
import { ReplacementTable } from '@/entities/replacement/ui';

interface Props {
  className?: string;
}

export const ReplacementList: React.FC<Props> = () => {
  const [searchValue, setSearchValue] = React.useState('');

  const onClickClear = () => {
    setSearchValue('');
  };

  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useGetReplacements(searchValue);
  const replacements = data?.pages.flatMap((page) => page.replacements) ?? [];

  return (
    <>
      <Card className='mt-6 p-0 overflow-hidden pb-12 relative'>
        <CardHeader className='pb-5 pt-4 bg-card-header shadow-sm'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-10'>
              {' '}
              <CardTitle>История замен</CardTitle>
              <div className='relative '>
                <Search className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                <Input
                  placeholder='Поиск...'
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className='pl-10 bg-white '
                />
                {searchValue && <ClearButton onClick={onClickClear} />}
              </div>
            </div>

            {/* Попап замены картриджа */}
            <ReplacementModal />
          </div>
        </CardHeader>
        <div className='min-h-[384px] relative'>
          {isLoading ? (
            <LoadingBounce />
          ) : (
            <CardContent>
              {replacements.length === 0 ? (
                <div className='text-center py-8 text-muted-foreground'>Ничего не найдено</div>
              ) : (
                <div>
                  <ReplacementTable items={replacements} />
                </div>
              )}
            </CardContent>
          )}
        </div>
        {hasNextPage && (
          <ShowMore
            showMore={hasNextPage}
            onClick={() => fetchNextPage()}
            loading={isFetchingNextPage}
          />
        )}
      </Card>
    </>
  );
};
