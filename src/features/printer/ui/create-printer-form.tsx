'use client';
import { CheckModels } from '@/entities/cartridge-model/ui/check-models';
import { FormInput } from '@/shared/components/form';
import { Button } from '@/shared/components/ui';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { PreviewCreatePrinter } from './preview-create-printer';
import { usePrintersMutations } from '../model/hooks/use-printer-mutation';

interface Props {
  className?: string;
  onClose: VoidFunction;
}

export type FormDataType = {
  name: string;
  models: number[];
};

export const CreatePrinterForm: React.FC<Props> = ({ onClose }) => {
  const { create } = usePrintersMutations();
  const form = useForm({
    defaultValues: {
      name: '',
      models: [] as number[],
    },
  });

  const onSubmit = async (data: FormDataType) => {
    try {
      const payload = {
        name: data.name,
        models: data.models.map((id: number) => ({ id })),
      };

      await create.mutateAsync(payload);

      form.reset();
    } catch (error) {
      console.error('Error [ADD_PRINTER_FORM]', error);
    } finally {
      onClose();
    }
  };

  const disabled =
    !form.watch('models') ||
    form.watch('models').length === 0 ||
    !form.watch('name') ||
    form.watch('name').length === 0;

  return (
    <FormProvider {...form}>
      <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
        <FormInput
          name='name'
          label='Модель принтера'
          type='text'
          placeholder='Например, HP LaserJet Pro M404dn'
          required
        />

        {/* Выбор существующих моделей */}
        <CheckModels />

        {/* Превью */}
        <PreviewCreatePrinter />

        <div className='pt-4 grid grid-cols-2 gap-4'>
          <Button disabled={disabled || form.formState.isSubmitting} type='submit'>
            Добавить принтер
          </Button>
          <Button
            disabled={form.formState.isSubmitting}
            type='button'
            variant={'outline'}
            onClick={onClose}
          >
            Отмена
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
