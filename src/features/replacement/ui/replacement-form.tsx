import { CartridgeSelect } from '@/entities/cartridge/ui';
import { FormDate } from '@/shared/components/form';
import { Button } from '@/shared/components/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ReplacementFormType, replacementSchema } from '../model/schemas/replacement-schema';
import { convertDate } from '@/shared/lib';
import { DepartamentSelect } from '@/entities/departament/ui';
import { useGetCartridges } from '@/entities/cartridge/api/use-get-cartridges';
import { CartridgeStatus } from '@prisma/client';
import { ResponsibleForm } from '@/entities/user/ui';
import { useReplacementMutations } from '../model/hooks/use-replacement-mutation';

interface Props {
  className?: string;
  onClose: VoidFunction;
}

export const ReplacementForm: React.FC<Props> = ({ onClose }) => {
  const { create } = useReplacementMutations();
  const form = useForm<ReplacementFormType>({
    resolver: zodResolver(replacementSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      installedCartridge: null,
      removedCartridge: null,
    },
  });

  const onSubmit = async (data: ReplacementFormType) => {
    try {
      data.date = convertDate(data.date);

      await create.mutateAsync(data);
      form.reset();
    } catch (error) {
      console.error('Error [REPLACEMENT_FORM]', error);
    } finally {
      onClose();
    }
  };

  const { cartridges } = useGetCartridges([CartridgeStatus.AVAILABLE, CartridgeStatus.WORKING]);
  const avaibleCartridges = cartridges.filter((c) => c.status === CartridgeStatus.AVAILABLE);
  const workingCartridges = cartridges.filter((c) => c.status === CartridgeStatus.WORKING);
  return (
    <FormProvider {...form}>
      <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
        <FormDate name='date' required />
        <DepartamentSelect />

        <CartridgeSelect
          name='installedCartridge'
          label='Установленный картридж'
          items={avaibleCartridges}
        />
        <CartridgeSelect
          name='removedCartridge'
          label='Снятый картридж'
          items={workingCartridges}
        />

        <ResponsibleForm />

        <Button disabled={form.formState.isSubmitting} type='submit' className='w-full mt-6'>
          {form.formState.isSubmitting ? 'Оформление...' : 'Подтвердить'}
        </Button>
      </form>
    </FormProvider>
  );
};
