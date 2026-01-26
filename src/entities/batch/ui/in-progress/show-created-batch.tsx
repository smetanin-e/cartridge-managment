import React from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui';
import { Eye } from 'lucide-react';
import { BatchCartridge } from '@/entities/cartridge/model/types';
import { Notes } from '@/shared/components';

interface Props {
  className?: string;
  cartridges: BatchCartridge[];
  date: string;
  responsible: string;
  notes: string;
}

export const ShowCreatedBatch: React.FC<Props> = ({ cartridges, date, responsible, notes }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' size='sm'>
          <Eye className='h-4 w-4' />
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-2xl'>
        <DialogHeader>
          <DialogTitle>Партия от {date}</DialogTitle>
        </DialogHeader>
        <div className='space-y-4'>
          <div className='grid grid-cols-2 gap-4 text-sm'>
            <div>
              <strong>Количество:</strong> {cartridges.length} шт.
            </div>
            <div>
              <strong>Ответственный:</strong> {responsible}
            </div>
          </div>
          <div className='h-80 overflow-y-auto'>
            <div className='grid sticky top-0 z-10 text-sm font-semibold px-2 py-2 grid-cols-[1fr_1fr] bg-card-header shadow-sm mb-2'>
              <div>Номер</div>
              <div>Модель</div>
            </div>

            {cartridges.map((cartridge) => (
              <div
                key={cartridge.id}
                className='grid px-2 py-2 items-center text-sm  grid-cols-[1fr_1fr]'
              >
                <div className='font-medium'>{cartridge.label}</div>
                <div>{cartridge.model.model}</div>
              </div>
            ))}
          </div>
        </div>
        {notes && <Notes notes={notes} />}
      </DialogContent>
    </Dialog>
  );
};
