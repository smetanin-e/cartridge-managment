import { useMutation } from '@tanstack/react-query';
import { registerModelAction } from '../../actions/register-model-action';
import { queryClient } from '@/shared/lib/query-client';
import toast from 'react-hot-toast';

export const useModelMutations = () => {
  const create = useMutation({
    mutationFn: registerModelAction,
    onSuccess: async (res) => {
      if (res.success) {
        queryClient.invalidateQueries({ queryKey: ['models'] });
        toast.success('Модель добавлена! ✅');
      } else {
        toast.error(res.message || 'Ошибка при создании модели ❌');
      }
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Не удалось добавить модель ❌');
    },
  });

  return {
    create,
  };
};
