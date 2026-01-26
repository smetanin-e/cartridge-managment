import { useMutation } from '@tanstack/react-query';
import { createBatchAction } from '../../actions/create-batch-action';
import { queryClient } from '@/shared/lib/query-client';
import toast from 'react-hot-toast';
import { cancelBatchAction } from '../../actions/cancel-batch';
import { returnCartridgesAction } from '../../actions/return-cartridges';

export const useBatchMutations = () => {
  const create = useMutation({
    mutationFn: createBatchAction,
    onSuccess: async (res) => {
      if (res.success) {
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: ['batches'] }),
          queryClient.invalidateQueries({ queryKey: ['cartridges'] }),
        ]);

        toast.success('Партия оформлена! ✅');
      } else {
        toast.error(res.message || 'Ошибка при оформлении партии ❌');
      }
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Не удалось оформить партию ❌');
    },
  });

  const remove = useMutation({
    mutationFn: cancelBatchAction,
    onSuccess: async (res) => {
      if (!res.success) {
        toast.error(res.message || 'Ошибка отмены партии ❌');
        return;
      }

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['batches'] }),
        queryClient.invalidateQueries({ queryKey: ['cartridges'] }),
      ]);

      toast.success('Успешная отмена партии! ✅');
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Не удалось отменить партию ❌');
    },
  });

  const update = useMutation({
    mutationFn: returnCartridgesAction,
    onSuccess: async (res) => {
      if (!res.success) {
        toast.error(res.message || 'Ошибка возврата картриджей ❌');
        return;
      }

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['batches'] }),
        queryClient.invalidateQueries({ queryKey: ['cartridges'] }),
      ]);

      toast.success('Возврат картриджей выполнен! ✅');
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : 'Не удалось выполнить возврат картриджей ❌',
      );
    },
  });

  return {
    create,
    remove,
    update,
  };
};
