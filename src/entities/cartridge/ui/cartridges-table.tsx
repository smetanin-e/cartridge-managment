import React from 'react';
import { CartridgeDTO } from '../model/types';
import { getStatusBadge } from './get-status-badge';
import { DeleteCartridge } from '@/features/cartridge/ui';
import { ChangeCartridgeStatus } from '@/features/cartridge/ui/change-cartridge-status';

interface Props {
  className?: string;
  count: number;
  items: CartridgeDTO[];
}

export const CartridgesTable: React.FC<Props> = ({ count, items }) => {
  return (
    <div className='h-[625px] overflow-auto overflow-y-scroll'>
      <div className='grid sticky top-0 z-10 text-sm font-semibold px-4 py-2 grid-cols-[120px_250px_250px_1fr] bg-card-header shadow-sm mb-2'>
        <div>Номер</div>
        <div>Модель</div>
        <div>Статус</div>
        <div className='text-right'>Действия</div>
      </div>
      {count === 0 ? (
        <div className='text-center py-8 text-muted-foreground'>Картриджи не найдены</div>
      ) : (
        <>
          {items.map((cartridge) => (
            <div
              key={cartridge.id}
              className='grid px-4 py-2 items-center text-sm  grid-cols-[120px_250px_250px_1fr] border-b-1'
            >
              <div className='font-medium'>{cartridge.label}</div>
              <div>{cartridge.model?.model}</div>
              <div>{getStatusBadge(cartridge.status)}</div>
              <div className='flex items-center justify-end gap-6'>
                <ChangeCartridgeStatus id={cartridge.id} currentStatus={cartridge.status} />
                <DeleteCartridge cartridgeId={cartridge.id} cartridgeLabel={cartridge.label} />
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
