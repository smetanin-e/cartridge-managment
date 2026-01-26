'use client';
import React from 'react';
import { Button } from '@/shared/components/ui';
import { FormProvider, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { createUserSchema, CreateUserType } from '../model/schemas/create-user-schema';
import { FormInput, FormSelect } from '@/shared/components/form';
import { USER_ROLES } from '@/shared/constants';
import { useUserMutations } from '../model/hooks/use-user-mutation';

interface Props {
  className?: string;
  setOpen: (value: boolean) => void;
}

export const CreateUserForm: React.FC<Props> = ({ setOpen }) => {
  const { create } = useUserMutations();
  const form = useForm<CreateUserType>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      login: '',
      password: '',
      confirmPassword: '',
      surname: '',
      firstName: '',
      lastName: '',
    },
  });

  const onSubmit = async (data: CreateUserType) => {
    try {
      await create.mutateAsync(data);
    } catch (error) {
      console.error('Error [REGISTER_FORM]', error);
    } finally {
      setOpen(false);
    }
  };
  return (
    <FormProvider {...form}>
      <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-8'>
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

        <div className='border-t pt-4'>
          <h3 className='text-sm font-semibold mb-3'>Учетные данные</h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
            <div className='space-y-2'>
              <FormInput
                label='Логин'
                name='login'
                id='login'
                type='text'
                placeholder='Логин...'
                required
              />
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-12'>
            <div className='space-y-2'>
              <FormInput
                label='Пароль'
                name='password'
                id='password'
                type='password'
                placeholder='Пароль...'
                required
              />
            </div>
            <div className='space-y-2'>
              <FormInput
                label='Подтверждение пароля'
                name='confirmPassword'
                id='confirmPassword'
                type='password'
                placeholder='Подтверждение пароля...'
                required
              />
            </div>
          </div>
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <Button disabled={form.formState.isSubmitting} type='submit'>
            {form.formState.isSubmitting ? 'Создание пользователя...' : 'Добавить пользователя'}
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
