import {
  Button,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui';
import { Dialog } from '@radix-ui/react-dialog';
import React from 'react';
import { ReturnBatchForm } from './return-batch-form';
import { BatchCartridge } from '@/entities/cartridge/model/types';
import { ChoiceCartridges } from '@/entities/cartridge/ui';

interface Props {
  className?: string;
  batchId: string;
  date: string;
  responsible: string;
  status: React.ReactNode;
  cartridges: BatchCartridge[];
}

export const ReturnBatchModal: React.FC<Props> = ({
  date,
  responsible,
  status,
  cartridges,
  batchId,
}) => {
  const [open, setOpen] = React.useState(false);
  const [selectedCartridges, setSelectedCartridges] = React.useState<number[]>([]);
  const onClose = () => {
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size='sm'>Принять</Button>
      </DialogTrigger>
      <DialogContent className='max-w-6xl sm:max-w-auto' aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Прием партии от {date}</DialogTitle>
        </DialogHeader>

        <div className='space-y-6'>
          {/* Информация о партии */}
          <div className='grid grid-cols-2 gap-4 text-sm bg-muted p-4 rounded-lg'>
            <div>
              <strong>Дата отправки:</strong> {date}
            </div>
            <div>
              <strong>Ответственный за отправку:</strong> {responsible}
            </div>
            <div className='flex items-center gap-4'>
              <strong>Статус:</strong> <p>{status}</p>
            </div>
            <div>
              <strong>Всего картриджей:</strong> {cartridges.length}
            </div>
          </div>

          {/* Выбор картриджей */}
          <ChoiceCartridges
            cartridges={cartridges}
            selectedCartridges={selectedCartridges}
            setSelectedCartridges={setSelectedCartridges}
          />
          {/* Форма приема  */}
          <ReturnBatchForm
            batchId={batchId}
            selectedCartridges={selectedCartridges}
            setSelectedCartridges={setSelectedCartridges}
            onClose={onClose}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
