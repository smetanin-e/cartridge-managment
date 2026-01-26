'use client';

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui';
import { UserPlus } from 'lucide-react';
import React from 'react';
import { CreateUserForm } from './create-user-form';

export const CreateUserModal: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <UserPlus className='h-4 w-4 mr-2' />
          Добавить пользователя
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-2xl'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <UserPlus className='h-5 w-5' />
            Добавить нового пользователя
          </DialogTitle>
        </DialogHeader>

        <CreateUserForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};
