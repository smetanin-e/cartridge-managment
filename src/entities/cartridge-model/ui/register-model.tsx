'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui';
import { Package } from 'lucide-react';
import React from 'react';

import { useModelsStore } from '../model/store';
import { RegisterModelForm } from './register-model-form';

interface Props {
  className?: string;
}

export const RegisterModel: React.FC<Props> = () => {
  const { openModal, setOpenModal } = useModelsStore();

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <Package className='h-5 w-5' />
            Добавить модель картриджа
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>Добавление модели картриджа в базу данных</DialogDescription>
        <RegisterModelForm />

        {/* {models.length > 0 && (
          <div className='mt-4'>
            <h3 className='text-md font-semibold mb-2'>Существующие модели:</h3>
            <div className='flex flex-wrap gap-2'>
              {models.map((model) => (
                <Badge key={model.id} variant='secondary'>
                  {model.model}
                </Badge>
              ))}
            </div>
          </div>
        )} */}
      </DialogContent>
    </Dialog>
  );
};
