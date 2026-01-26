import { RegisterModel } from '@/entities/cartridge-model/ui';
import { getUserSession } from '@/features/auth/actions/get-user-session';
import { Header } from '@/shared/components';
import { CartridgeList } from '@/widgets/cartridges/ui/cartridge-list';
import { Printers } from '@/widgets/printers/ui/printers';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function CartridgesPage() {
  const user = await getUserSession();
  if (!user) return redirect('/');
  return (
    <div className='container mx-auto py-4 px-2'>
      <Header
        title='Реестр картриджей'
        description='Регистрация картриджей, управление состоянием'
        user={user}
      />
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <div className='space-y-6'>
          <CartridgeList />
        </div>

        {/* Таблица принтеров */}
        <Printers />
      </div>
      {/* Модалка добавления модели (Вызываем в CartridgeList и Printers ) */}
      <RegisterModel />
    </div>
  );
}
