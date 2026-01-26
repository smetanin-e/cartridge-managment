'use client';
import { FormInput } from '@/shared/components/form';
import { Button } from '@/shared/components/ui';
import { Plus } from 'lucide-react';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { createDepartamentSchema, FormDepartamentType } from '../model/schema/departament-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDepartamentMutations } from '@/features/departament/model/hooks/use-departament-mutation';

interface Props {
  className?: string;
  onClose: VoidFunction;
}

export const DepartamentForm: React.FC<Props> = ({ onClose }) => {
  const { create } = useDepartamentMutations();
  const form = useForm<FormDepartamentType>({
    resolver: zodResolver(createDepartamentSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async (data: FormDepartamentType) => {
    try {
      await create.mutateAsync(data);
    } catch (error) {
      console.error('Error [DEPARTAMENT_FORM]', error);
    } finally {
      onClose();
    }
  };
  return (
    <FormProvider {...form}>
      <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-3 '>
          <FormInput
            name='name'
            label='Подразделение'
            type='text'
            placeholder='Например, Бухгалтерия (Отдел учета запасов)'
            required
          />
        </div>
        <div className='pt-4 flex justify-end'>
          <Button disabled={form.formState.isSubmitting} type='submit' className='w-[250px]'>
            <Plus className='h-4 w-4 mr-2' />
            Добавить подразделение
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
