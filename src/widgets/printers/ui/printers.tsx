'use client';

import { Card, CardContent, CardHeader, CardTitle, Input } from '@/shared/components/ui';
import { PrinterIcon, Search } from 'lucide-react';

import { ClearButton, LoadingBounce } from '@/shared/components';
import React from 'react';
import { searchPrinterFilter } from '@/entities/printer/model/lib/search-printer-filter';
import { useGetPrinters } from '@/entities/printer/api/use-get-printers';
import { PrinterList } from '@/entities/printer/ui';
import { CreatePrinterModal } from '@/features/printer/ui';

interface Props {
  className?: string;
}
export const Printers: React.FC<Props> = () => {
  const [searchValue, setSearchValue] = React.useState('');
  const { data, isLoading } = useGetPrinters();
  const printers = data ? data : [];

  const filteredPrinters = searchPrinterFilter(printers, searchValue);

  const onClickClear = () => {
    setSearchValue('');
  };

  return (
    <div>
      <Card className='gap-1 p-0 overflow-hidden'>
        <CardHeader className='pb-5 pt-4 relative shadow-sm bg-card-header'>
          <div className='flex items-center justify-between'>
            <CardTitle className='flex items-center gap-2'>
              <PrinterIcon className='h-5 w-5' />
              Принтеры и совместимые картриджи
            </CardTitle>
          </div>
          <div className=' mt-2 flex justify-between items-center gap-8'>
            <div className='relative w-full'>
              <Search className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
              <Input
                placeholder='Поиск принтера по названию или модели картриджа...'
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className='pl-10 bg-white'
              />
              {searchValue && <ClearButton onClick={onClickClear} />}
            </div>
            <CreatePrinterModal />
          </div>
        </CardHeader>
        <CardContent className='relative h-[625px] p-0'>
          {isLoading ? (
            <LoadingBounce />
          ) : (
            <>
              {filteredPrinters.length === 0 ? (
                <div className='h-[625px] text-center py-8 text-muted-foreground'>
                  Нет данных о принтерах
                </div>
              ) : (
                <PrinterList printers={filteredPrinters} />
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
