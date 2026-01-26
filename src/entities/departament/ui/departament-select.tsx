'use client';
import { FormCustomSelect } from '@/shared/components/form';
import { Departament } from '@prisma/client';
import React from 'react';
import { useGetDepartaments } from '../api/use-get-departaments';
import { CreateDepartamentModal } from './create-departament-modal';

interface Props {
  className?: string;
}

export const DepartamentSelect: React.FC<Props> = () => {
  const { departaments } = useGetDepartaments();

  return (
    <>
      <FormCustomSelect<Departament>
        name={'departamentId'}
        label='Подразделение'
        required
        error='Нужно указать подразделение'
        items={departaments}
        placeholder='Укажите подразделение'
        getKey={(c) => c.id}
        getLabel={(c) => c.name}
        renderValue={(c) => c.name}
        renderItem={(c) => c.name}
        onAdd={<CreateDepartamentModal />}
      />
    </>
  );
};
