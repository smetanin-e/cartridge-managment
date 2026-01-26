'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui';
import { ToyBrick } from 'lucide-react';
import { CartridgeStatus } from '@prisma/client';
import { LoadingBounce } from '@/shared/components';

import { searchCartridgesFilter } from '@/entities/cartridge/model/lib/search-cartridges-filter';
import { useGetCartridges } from '@/entities/cartridge/api/use-get-cartridges';
import { CartridgesFilter, CartridgesTable } from '@/entities/cartridge/ui';
import { RegisterCartridgeModal } from '@/features/cartridge/ui/register-cartridge-modal';

interface Props {
  className?: string;
}

export const CartridgeList: React.FC<Props> = () => {
  const { cartridges, isLoading } = useGetCartridges();

  const [searchValue, setSearchValue] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<CartridgeStatus | 'all'>('all');

  const filteredCartridges = searchCartridgesFilter(cartridges, searchValue, statusFilter);

  return (
    <div>
      {/* Таблица картриджей */}
      <Card className='gap-1 p-0 overflow-hidden  '>
        <CardHeader className='pb-5 pt-4 relative shadow-sm bg-card-header'>
          <div className='flex items-center justify-between'>
            <CardTitle className='flex items-center gap-2'>
              <ToyBrick className='h-5 w-5' />
              Реестр картриджей
            </CardTitle>
          </div>
          <div className='flex items-center justify-between mt-2'>
            <CartridgesFilter
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
            />
            <RegisterCartridgeModal />
          </div>
        </CardHeader>
        <CardContent className='relative h-[625px] p-0'>
          {isLoading ? (
            <LoadingBounce />
          ) : (
            <>
              {filteredCartridges.length === 0 ? (
                <div className='h-[625px] text-center py-8 text-muted-foreground'>
                  {cartridges?.length === 0 ? 'Список картриджей пуст' : 'Нет такого картриджа'}
                </div>
              ) : (
                <CartridgesTable count={filteredCartridges.length} items={filteredCartridges} />
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
