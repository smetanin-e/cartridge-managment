'use client';
import { Button } from '@/shared/components/ui';
import { Plus } from 'lucide-react';
import React from 'react';
import { useModelsStore } from '../model/store';

interface Props {
  className?: string;
}

export const ButtonRegisterModel: React.FC<Props> = () => {
  const addModel = useModelsStore((state) => state.setOpenModal);
  return (
    <Button type='button' variant='outline' onClick={() => addModel(true)}>
      <Plus className='h-4 w-4' />
      Добавить модель
    </Button>
  );
};
