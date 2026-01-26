import React from 'react';

import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui';
import { Eye } from 'lucide-react';
import { BatchDTO } from '../../model/types';
import { BatchCartridge } from '@/entities/cartridge/model/types';
import { ShowBatchTable } from './show-batch-table';
import { Notes } from '@/shared/components';

interface Props {
  className?: string;
  date: string;
  responsible: string;
  status: React.ReactNode;
  cartridges: BatchCartridge[];
  batch: BatchDTO;
}

export const ShowBatchModal: React.FC<Props> = ({
  date,
  responsible,
  status,
  cartridges,
  batch,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' size='sm'>
          <Eye className='h-4 w-4' />
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-4xl sm:max-w-auto' aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Партия от {date}</DialogTitle>
        </DialogHeader>
        <div className='space-y-4'>
          <div className='grid grid-cols-1 gap-1 text-sm'>
            <div>
              <strong>Партию отправлял:</strong> {responsible}
            </div>
            <div className='flex gap-3'>
              <strong>Статус:</strong> <p>{status}</p>
            </div>

            {batch.partialReturnDate && (
              <div>
                <strong>Дата частичного возврата:</strong> {batch.partialReturnDate}
              </div>
            )}
          </div>
          <div className='h-60 overflow-y-auto'>
            <div className='grid sticky top-0 z-10 text-sm font-semibold px-2 py-2 grid-cols-[100px_100px_120px_150px_150px_1fr] bg-card-header shadow-sm mb-2'>
              <div>Номер</div>
              <div>Модель</div>
              <div>Статус</div>
              <div>Дата возврата</div>
              <div>Принял</div>
              <div>Комментарий</div>
            </div>

            {cartridges.map((cartridge) => (
              <div
                key={cartridge.id}
                className='grid px-2 py-2 items-center text-sm  grid-cols-[100px_100px_120px_150px_150px_1fr]'
              >
                <ShowBatchTable batch={batch} cartridge={cartridge} />
              </div>
            ))}
          </div>
        </div>
        {batch.notes && (
          <DialogFooter className='sm:justify-start'>
            <Notes notes={batch.notes} />
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
