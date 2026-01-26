import React from 'react';
import { Checkbox } from '@/shared/components/ui';
import { CartridgeDTO } from '../model/types';
import { useSelectetCartridgeStore } from '../model/store';
import { getStatusBadge } from './get-status-badge';
import { handleCartridgeSelect, handleSelectAllCartridges } from '../model/lib';
interface Props {
  className?: string;
  searchValue: string;
  availableForService: CartridgeDTO[];
}

export const SendingCartridgesList: React.FC<Props> = ({ availableForService, searchValue }) => {
  const { selectedCartridges, setSelectedCartridges } = useSelectetCartridgeStore();

  const filteredCartriges = availableForService.filter((cartridge) =>
    searchValue ? cartridge.label.toLowerCase().includes(searchValue.toLowerCase()) : true,
  );

  const isAllSelected =
    availableForService.length > 0 && selectedCartridges.length === availableForService.length;
  return (
    <div className='h-[369px] overflow-y-auto'>
      <div className='grid sticky top-0 z-10 text-sm font-semibold px-2 py-2 grid-cols-[50px_100px_250px_200px] bg-card-header shadow-sm mb-2'>
        <div>
          <Checkbox
            id='select-all'
            checked={isAllSelected}
            onCheckedChange={(checked) =>
              handleSelectAllCartridges(
                availableForService,
                checked === true,
                setSelectedCartridges,
              )
            }
          />
        </div>
        <div>Номер</div>
        <div>Модель</div>
        <div>Статус</div>
      </div>

      {filteredCartriges.map((cartridge) => (
        <div
          key={cartridge.id}
          className='grid px-2 py-2 items-center text-sm  grid-cols-[50px_100px_250px_200px]'
        >
          <div>
            <Checkbox
              checked={selectedCartridges.includes(cartridge.id)}
              onCheckedChange={(checked) =>
                handleCartridgeSelect(
                  selectedCartridges,
                  cartridge.id,
                  checked as boolean,
                  setSelectedCartridges,
                )
              }
            />
          </div>
          <div className='font-medium'>{cartridge.label}</div>
          <div>{cartridge.model?.model}</div>
          <div>{getStatusBadge(cartridge.status)}</div>
        </div>
      ))}
    </div>
  );
};
