'use client';
import React from 'react';

import { Button } from '@/shared/components//ui';
import { FormProvider, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import { LoginFormType, loginSchema } from '../model/schemas/login-schema';
import { FormInput } from '@/shared/components/form';
import { useRouter } from 'next/navigation';

interface Props {
  className?: string;
  onClose: VoidFunction;
}

export const LoginForm: React.FC<Props> = ({ onClose }) => {
  const router = useRouter();
  const form = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      login: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormType) => {
    try {
      const resp = await signIn('credentials', {
        ...data,
        redirect: false,
      });

      if (resp?.error) {
        return toast.error(resp.error); // покажет текст из throw new Error('...')
      }
      onClose?.();
      router.push('/replacement');
      toast.success('Добро пожаловать!');
    } catch (error) {
      console.error('Error [LOGIN]', error);
      toast.error('Не удалось войти в аккаунт');
    }
  };
  return (
    <FormProvider {...form}>
      <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
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
        <div className='space-y-2'>
          <FormInput
            label='Пароль'
            name='password'
            id='password'
            type='password'
            placeholder='Введите пароль'
            required
          />
        </div>

        <Button disabled={form.formState.isSubmitting} className='w-full mt-6' type='submit'>
          Войти
        </Button>
      </form>
    </FormProvider>
  );
};
