import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/shared/lib/query-client';
import toast from 'react-hot-toast';
import { registerDepartamentAction } from '../../actions/register-departament-action';

export const useDepartamentMutations = () => {
  const create = useMutation({
    mutationFn: registerDepartamentAction,
    onSuccess: async (res) => {
      if (res.success) {
        queryClient.invalidateQueries({ queryKey: ['departaments'] });
        toast.success('Подразделение добавлено! ✅');
      } else {
        toast.error(res.message || 'Ошибка при добавлении подразделения ❌');
      }
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Не удалось добавить подразделение ❌');
    },
  });

  return {
    create,
  };
};
