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
import { Plus, ToyBrick } from 'lucide-react';
import { RegisterCartridgeForm } from './register-cartridge-form';

interface Props {
  className?: string;
}

export const RegisterCartridgeModal: React.FC<Props> = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={'sm'}>
          <Plus className='h-4 w-4' />
          Добавить картридж
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <ToyBrick className='h-5 w-5' />
            Добавление картриджа в реестр
          </DialogTitle>
          <DialogDescription>Заполните номер и выберите модель картриджа</DialogDescription>
        </DialogHeader>

        <RegisterCartridgeForm onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};
