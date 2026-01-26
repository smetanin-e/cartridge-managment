'use client';
import { AlertDialog } from '@/shared/components';
import { Button } from '@/shared/components/ui';
import { Trash2 } from 'lucide-react';
import React from 'react';
import { useReplacementMutations } from '../model/hooks/use-replacement-mutation';

interface Props {
  className?: string;
  replacementId: number;
}

export const CancelReplacement: React.FC<Props> = ({ replacementId }) => {
  const { deleteReplacement } = useReplacementMutations();

  const handleDelete = async () => {
    try {
      await deleteReplacement.mutateAsync(replacementId);
    } catch (error) {
      console.error('Failed to cancel replacement', error);
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
        description={`Вы действительно хотите отменить замену?`}
        onConfirm={handleDelete}
      />
    </div>
  );
};
