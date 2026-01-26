'use client';
import React from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui';
import { Plus, PrinterIcon } from 'lucide-react';
import { CreatePrinterForm } from './create-printer-form';

interface Props {
  className?: string;
}

export const CreatePrinterModal: React.FC<Props> = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={'sm'}>
          <Plus className='h-4 w-4 mr-2' />
          Добавить принтер
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <PrinterIcon className='h-5 w-5' />
            Добавить новый принтер
          </DialogTitle>
          <DialogDescription>
            Заполните название принтера и выберите совместимые картриджи
          </DialogDescription>
        </DialogHeader>
        <CreatePrinterForm onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};
