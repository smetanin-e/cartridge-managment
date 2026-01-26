'use client';
import { FormInput } from '@/shared/components/form';
import { Button } from '@/shared/components/ui';
import { Plus } from 'lucide-react';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { RegisterModelFormType, registerModelSchema } from '../model/schema/model-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useModelsStore } from '../model/store';
import { useModelMutations } from '@/features/cartridge-model/model/hooks/use-model-mutation';

interface Props {
  className?: string;
}

export const RegisterModelForm: React.FC<Props> = () => {
  const closeModal = useModelsStore((state) => state.setOpenModal);
  const { create } = useModelMutations();

  const form = useForm<RegisterModelFormType>({
    resolver: zodResolver(registerModelSchema),
    defaultValues: {
      model: '',
    },
  });

  const onSubmit = async (data: RegisterModelFormType) => {
    try {
      await create.mutateAsync(data);
      form.reset();
    } catch (error) {
      console.error('Error [REGISTER_MODEL_FORM]', error);
    } finally {
      closeModal(false);
    }
  };
  return (
    <FormProvider {...form}>
      <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-3 '>
          <FormInput
            name='model'
            label='Модель картриджа'
            type='text'
            placeholder='Например, CE505X'
            required
          />
        </div>
        <div className='pt-4 flex justify-end'>
          <Button disabled={form.formState.isSubmitting} type='submit' className='w-full'>
            <Plus className='h-4 w-4 mr-2' />
            {form.formState.isSubmitting ? 'Создание модели...' : 'Добавить модель'}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
