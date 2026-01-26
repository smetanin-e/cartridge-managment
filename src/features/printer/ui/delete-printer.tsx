import React from 'react';
import { Trash2 } from 'lucide-react';
import { usePrintersMutations } from '../model/hooks/use-printer-mutation';
import { AlertDialog } from '@/shared/components';
import { Button } from '@/shared/components/ui';

interface Props {
  className?: string;
  printerId: number;
  printerName: string;
}

export const DeletePrinter: React.FC<Props> = ({ printerId, printerName }) => {
  const { deletePrinter } = usePrintersMutations();

  const handleDelete = async () => {
    try {
      await deletePrinter.mutateAsync(printerId);
    } catch (error) {
      console.error('Error [DeletePrinter]', error);
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
        description={`Вы действительно хотите удалить принтер - ${printerName}?`}
        onConfirm={handleDelete}
      />
    </div>
  );
};
