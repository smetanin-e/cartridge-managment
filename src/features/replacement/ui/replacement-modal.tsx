'use client';
import React from 'react';

import { Edit, Package } from 'lucide-react';

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui';
import { ReplacementForm } from './replacement-form';

interface Props {
  className?: string;
}

export const ReplacementModal: React.FC<Props> = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='flex items-center gap-2'>
          <Edit className='h-4 w-4' />
          Замена картриджа
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <Package className='h-5 w-5' />
            Замена картриджа
          </DialogTitle>
        </DialogHeader>

        <div>
          <ReplacementForm onClose={() => setOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
