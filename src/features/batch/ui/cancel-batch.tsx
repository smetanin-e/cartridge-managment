'use client';
import React from 'react';
import { Button } from '@/shared/components/ui';
import { Undo2 } from 'lucide-react';

import { useBatchMutations } from '../model/hooks/use-batch-mutation';
import { AlertDialog } from '@/shared/components';
interface Props {
  className?: string;

  batchId: string;
}

export const CancelBatch: React.FC<Props> = ({ batchId }) => {
  const { remove } = useBatchMutations();
  const handleDelete = async () => {
    try {
      await remove.mutateAsync(batchId);
    } catch (error) {
      console.error('Failed to delete batch', error);
    }
  };
  return (
    <div>
      <AlertDialog
        trigger={
          <Button size={'icon'} variant='ghost'>
            <Undo2 className='w-4 h-4' />
          </Button>
        }
        description={`Вы действительно хотите отменить партию?`}
        onConfirm={handleDelete}
      />
    </div>
  );
};
