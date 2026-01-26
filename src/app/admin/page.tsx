import { getUserSession } from '@/features/auth/actions/get-user-session';
import { Header } from '@/shared/components/header';
import { Users } from '@/widgets/users/ui/users';

import { UserRole } from '@prisma/client';
import { redirect } from 'next/navigation';

export default async function AdminPage() {
  const user = await getUserSession();
  if (!user) return redirect('/');
  if (user.role !== UserRole.ADMIN) return redirect('/replacement');

  return (
    <div className='container mx-auto py-4 px-2'>
      <Header
        title='Администрирование'
        description='Управление пользователями и их ролями'
        user={user}
      />
      <Users user={user} />
    </div>
  );
}
