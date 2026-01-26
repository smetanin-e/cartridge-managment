'use client';
import React from 'react';
import { Button } from '@/shared/components/ui';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { USER_ROLES } from '@/shared/constants';
import { Agent } from '@/entities/user/model/types';
import { updateUserSchema, UpdateUserType } from '../model/schemas/update-user-schema';
import { FormInput, FormSelect } from '@/shared/components/form';
import { useUserMutations } from '../model/hooks/use-user-mutation';

interface Props {
  className?: string;
  setOpen: (value: boolean) => void;
  user: Agent;
}

export const UpdateUserForm: React.FC<Props> = ({ setOpen, user }) => {
  const { update } = useUserMutations();
  const form = useForm<UpdateUserType>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      id: user.id,
      surname: user.surname,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    },
  });

  const onSubmit = async (data: UpdateUserType) => {
    try {
      await update.mutateAsync({ userId: user.id, formData: data });
    } catch (error) {
      console.error('Error [UPDATE_USER_FORM]', error);
    } finally {
      setOpen(false);
    }
  };

  return (
    <FormProvider {...form}>
      <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-8'>
          <div className='hidden'>
            <FormInput name='id' id='id' type='number' value={user.id} readOnly />
          </div>
          <div className='space-y-2 mb-1'>
            <FormInput
              label='Фамилия'
              name='surname'
              id='surname'
              type='text'
              placeholder='Фамилия...'
              required
            />
          </div>
          <div className='space-y-2'>
            <FormInput
              label='Имя'
              name='firstName'
              id='firstName'
              type='text'
              placeholder='Имя...'
              required
            />
          </div>
          <div className='space-y-2'>
            <FormInput
              label='Отчество'
              name='lastName'
              id='lastName'
              type='text'
              placeholder='Отчество...'
              required
            />
          </div>

          <FormSelect required name='role' label='Роль' data={USER_ROLES} />
        </div>

        <div className=' grid grid-cols-2 gap-4'>
          <Button disabled={form.formState.isSubmitting} type='submit'>
            {form.formState.isSubmitting ? 'Данные обновляются...' : 'Обновить данные'}
          </Button>
          <Button
            disabled={form.formState.isSubmitting}
            type='button'
            variant='outline'
            onClick={() => setOpen(false)}
          >
            Отмена
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
