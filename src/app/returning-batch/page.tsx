import { getUserSession } from '@/features/auth/actions/get-user-session';
import { Header } from '@/shared/components';
import { WorkBatches, CompletedBatches } from '@/widgets/batches/ui';
import { redirect } from 'next/navigation';

export default async function BatchForRuturnPage() {
  const user = await getUserSession();
  if (!user) return redirect('/');

  return (
    <div className='container mx-auto py-4 px-2'>
      <Header
        title='Прием из сервиса'
        description='Управление возвратом картриджей из сервисного центра'
        user={user}
      />
      <WorkBatches />
      <CompletedBatches />
    </div>
  );
}
