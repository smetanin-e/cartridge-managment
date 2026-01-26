import { getUserSession } from '@/features/auth/actions/get-user-session';
import { CreateBatchForm } from '@/features/batch/ui/';
import { Header } from '@/shared/components';
import { InProgressBatches } from '@/widgets/batches/ui/in-progress-batches';
import { CartridgeServicePanel } from '@/widgets/cartridges/ui';
import { redirect } from 'next/navigation';

export default async function SendingBatchPage() {
  const user = await getUserSession();
  if (!user) return redirect('/');

  return (
    <div className='container mx-auto py-4 px-2'>
      <Header
        title='Отправка в сервис'
        description='Формирование партий картриджей для отправки в сервисный центр'
        user={user}
      />
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <CartridgeServicePanel />
        <CreateBatchForm />
      </div>
      <InProgressBatches />
    </div>
  );
}
