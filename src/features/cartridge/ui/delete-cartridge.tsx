'use client';
import { AlertDialog } from '@/shared/components';
import { Button } from '@/shared/components/ui';
import { Trash2 } from 'lucide-react';
import React from 'react';
import { useCartridgesMutations } from '../model/hooks/use-cartridge-mutation';

interface Props {
  className?: string;
  cartridgeId: number;
  cartridgeLabel: string;
}

export const DeleteCartridge: React.FC<Props> = ({ cartridgeId, cartridgeLabel }) => {
  const { deleteCartridge } = useCartridgesMutations();

  const handleDelete = async () => {
    try {
      await deleteCartridge.mutateAsync(cartridgeId);
    } catch (error) {
      console.error('Failed to delete cartridge', error);
    }
  };
  return (
    <div>
      <AlertDialog
        trigger={
          <Button size={'icon'} variant='ghost'>
            <Trash2 className='w-4 h-4' />
          </Button>
        }
        description={`Вы действительно хотите удалить картридж - ${cartridgeLabel}?`}
        onConfirm={handleDelete}
      />
    </div>
  );
};
