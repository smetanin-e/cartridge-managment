import { FormCustomSelect, FormInput, FormSelect } from '@/shared/components/form';
import { Button } from '@/shared/components/ui';
import { CARTRIDGE_STATUS } from '@/shared/constants/cartridge-status';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  RegisterCartridgeFormType,
  registerCartridgeSchema,
} from '../model/schemas/register-сartrige-schema';
import { useGetModels } from '@/entities/cartridge-model/api/use-get-mogels';
import { ButtonRegisterModel } from '@/entities/cartridge-model/ui';
import { useCartridgesMutations } from '../model/hooks/use-cartridge-mutation';

interface Props {
  className?: string;
  onClose: VoidFunction;
}

export const RegisterCartridgeForm: React.FC<Props> = ({ onClose }) => {
  const { create } = useCartridgesMutations();
  const { data: models } = useGetModels();

  const form = useForm<RegisterCartridgeFormType>({
    resolver: zodResolver(registerCartridgeSchema),
    defaultValues: {
      label: 'МК',
    },
  });

  const onSubmit = async (data: RegisterCartridgeFormType) => {
    try {
      await create.mutateAsync(data);
    } catch (error) {
      console.error('Error [REGISTER_CARTRIDGE_FORM]', error);
    } finally {
      onClose();
    }
  };
  return (
    <FormProvider {...form}>
      <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-3 '>
          <FormInput
            name='label'
            label='Номер картриджа'
            type='text'
            placeholder='Например, МК101'
            required
          />
          <FormCustomSelect
            name='modelId'
            label='Модель'
            required
            error={'Необходимо выбрать модель из списка'}
            items={models}
            placeholder='Выберите модель из списка'
            getKey={(m) => m.id}
            getLabel={(m) => m.model}
            renderItem={(m) => m.model}
            onAdd={<ButtonRegisterModel />}
          />

          <FormSelect required name='status' label='Состояние картриджа' data={CARTRIDGE_STATUS} />
        </div>

        <div className='pt-4 grid grid-cols-2 gap-4'>
          <Button disabled={form.formState.isSubmitting} type='submit'>
            Сохранить
          </Button>
          <Button type='button' variant='outline' onClick={onClose}>
            Отмена
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
