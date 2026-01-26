'use client';
import React from 'react';
import { Card, CardContent } from '@/shared/components/ui';
import { CartridgeStatus } from '@prisma/client';
import { useGetCartridges } from '@/entities/cartridge/api/use-get-cartridges';
import { SendingCartridgesList, SendingCartridgesHeader } from '@/entities/cartridge/ui';

import { LoadingBounce } from '@/shared/components';

interface Props {
  className?: string;
}

export const CartridgeServicePanel: React.FC<Props> = () => {
  const { cartridges, isLoading } = useGetCartridges();
  const [searchValue, setSearchValue] = React.useState('');
  const [checkedReserve, setCheckedReserve] = React.useState(false);

  const availableForService = cartridges.filter((cartridge) =>
    checkedReserve
      ? cartridge.status === CartridgeStatus.REFILL || cartridge.status === CartridgeStatus.RESERVE
      : cartridge.status === CartridgeStatus.REFILL,
  );

  return (
    <div className='lg:col-span-2'>
      <Card className='min-h-[515px] flex flex-col relative'>
        {isLoading ? (
          <LoadingBounce />
        ) : (
          <>
            <SendingCartridgesHeader
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              availableForService={availableForService}
              checkedReserve={checkedReserve}
              setCheckedReserve={setCheckedReserve}
            />
            <CardContent className='flex-1 overflow-y-scroll h-[100%]'>
              {availableForService.length === 0 ? (
                <div className='text-center py-8 text-muted-foreground'>
                  Нет картриджей доступных для отправки в сервис
                </div>
              ) : (
                <SendingCartridgesList
                  availableForService={availableForService}
                  searchValue={searchValue}
                />
              )}
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
};
