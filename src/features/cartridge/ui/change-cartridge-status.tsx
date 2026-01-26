import React from 'react';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Spinner,
} from '@/shared/components/ui';
import { MoreHorizontal } from 'lucide-react';
import { CartridgeStatus } from '@prisma/client';
import { CARTRIDGE_STATUS_CONFIG } from '@/shared/constants';
import { getStatusBadge } from '@/entities/cartridge/ui';
import { useCartridgesMutations } from '../model/hooks/use-cartridge-mutation';

interface Props {
  className?: string;
  id: number;
  currentStatus: CartridgeStatus;
}

export const ChangeCartridgeStatus: React.FC<Props> = ({ id, currentStatus }) => {
  const { updateStatus } = useCartridgesMutations();

  const statuses = Object.keys(CARTRIDGE_STATUS_CONFIG).filter(
    (key) =>
      key === CartridgeStatus.AVAILABLE ||
      key === CartridgeStatus.REFILL ||
      key === CartridgeStatus.RESERVE ||
      key === CartridgeStatus.DISCARDED,
  );

  const changeStatus = async (id: number, status: CartridgeStatus) => {
    try {
      const payload = { id, status };
      await updateStatus.mutateAsync(payload);
    } catch (error) {
      console.error('[changeCartridgeStatus]', error);
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='h-8 w-8 p-0 '>
          {updateStatus.isLoading ? (
            <Spinner className='h-4 w-4' />
          ) : (
            <MoreHorizontal className='h-4 w-4' />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {statuses
          .filter((s) => s !== currentStatus)
          .map((status) => (
            <DropdownMenuItem key={status} onClick={() => changeStatus(id, status)}>
              {getStatusBadge(status as CartridgeStatus)}
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
