'use client';
import React from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui';
import { Building2, Plus } from 'lucide-react';

import { DepartamentForm } from './departament-form';
interface Props {
  className?: string;
}

export const CreateDepartamentModal: React.FC<Props> = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={'sm'}>
          <Plus className='h-4 w-4' />
          Добавить подразделение
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <Building2 className='h-5 w-5' />
            Регистрация подразделения
          </DialogTitle>
        </DialogHeader>
        <DepartamentForm onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};
