import React from 'react';
import { Badge } from '@/shared/components/ui';
import { PrinterDTO } from '../model/types';
import { DeletePrinter } from '@/features/printer/ui';

interface Props {
  className?: string;
  printers: PrinterDTO[];
}

export const PrinterList: React.FC<Props> = ({ printers }) => {
  return (
    <div className='h-[625px] overflow-auto overflow-y-scroll'>
      <div className='grid sticky top-0 z-10 text-sm font-semibold px-4 py-2 grid-cols-[215px_1fr_80px] bg-card-header shadow-sm mb-2'>
        <div>Название принтера</div>
        <div>Совместимые модели</div>
        <div>Действия</div>
      </div>

      {printers.map((printer) => (
        <div
          key={printer.id}
          className='grid px-4 py-2 items-center text-sm  grid-cols-[215px_1fr_80px] border-b-1'
        >
          <div className='font-medium'>{printer.name}</div>
          <div>
            <div className='flex flex-wrap gap-1'>
              {printer.models?.length === 0 ? (
                <Badge variant='outline' className='text-muted-foreground'>
                  Нет данных
                </Badge>
              ) : (
                printer.models?.map((modelName) => (
                  <Badge key={modelName.id} variant='secondary'>
                    {modelName.model}
                  </Badge>
                ))
              )}
            </div>
          </div>
          <div className='text-center'>
            {' '}
            <DeletePrinter printerId={printer.id} printerName={printer.name} />{' '}
          </div>
        </div>
      ))}
    </div>
  );
};
