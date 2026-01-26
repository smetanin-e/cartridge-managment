import { CartridgeDTO } from '@/entities/cartridge/model/types';
import { Badge } from '@/shared/components/ui';
import React from 'react';
import { useSelectetCartridgeStore } from '../model/store';

interface Props {
  className?: string;
  cartridges: CartridgeDTO[];
}

export const SendingCartridgeDetails: React.FC<Props> = ({ cartridges }) => {
  const selectedCartridges = useSelectetCartridgeStore((state) => state.selectedCartridges);

  const previewModels = cartridges.filter((c) => selectedCartridges.includes(c.id));
  return (
    <div>
      <h6>
        {' '}
        Выбрано картриджей:{' '}
        <strong>{selectedCartridges.length > 0 ? selectedCartridges.length + ` шт.` : ''}</strong>
      </h6>
      <div className='flex flex-wrap gap-2'>
        {previewModels.length > 0 ? (
          previewModels.map((c) => {
            return (
              <Badge key={c.id} variant='secondary' className='text-sm'>
                {c.label}
              </Badge>
            );
          })
        ) : (
          <span className='text-gray-500 text-sm'>Ничего не выбрано</span>
        )}
      </div>
    </div>
  );
};
