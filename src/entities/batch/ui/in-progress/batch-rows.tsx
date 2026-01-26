//TODO Компонент не используется

import { Badge, Button, TableCell, TableRow } from '@/shared/components/ui';
import React from 'react';
import { ShowCreatedBatch } from './show-created-batch';
import { CancelBatch } from '@/features/batch/ui';
import { Printer } from 'lucide-react';
import { BatchDTO } from '../../model/types';

interface Props {
  className?: string;
  batch: BatchDTO;
  print: (batchId: string) => void;
}

export const BatchRows: React.FC<Props> = ({ batch, print }) => {
  return (
    <>
      {' '}
      <TableRow key={batch.id}>
        <TableCell>{batch.date}</TableCell>
        <TableCell>
          <Badge variant='outline'>{batch.cartridges.length} шт.</Badge>
        </TableCell>
        <TableCell>{batch.responsible}</TableCell>
        <TableCell className='text-right'>
          <div className='flex gap-2 justify-end'>
            <ShowCreatedBatch
              cartridges={batch.cartridges}
              date={batch.date}
              responsible={batch.responsible}
              notes={batch.notes}
            />

            <Button
              variant='outline'
              size='sm'
              onClick={() => {
                print(batch.id);
              }}
            >
              <Printer className='h-4 w-4' />
            </Button>

            <CancelBatch batchId={batch.id} />
          </div>
        </TableCell>
      </TableRow>
    </>
  );
};
