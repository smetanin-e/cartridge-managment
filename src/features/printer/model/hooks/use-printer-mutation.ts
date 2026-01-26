import { useMutation } from '@tanstack/react-query';
import { registerPrinterAction } from '../../actions/register-printer-action';
import { queryClient } from '@/shared/lib/query-client';
import toast from 'react-hot-toast';
import { deletePrinterAction } from '../../actions/delete-printer-action';

export const usePrintersMutations = () => {
  const create = useMutation({
    mutationFn: registerPrinterAction,
    onSuccess: async (res) => {
      if (res.success) {
        queryClient.invalidateQueries({ queryKey: ['printers'] });
        toast.success('Принтер добавлен в реестр! ✅');
      } else {
        toast.error(res.message || 'Ошибка при добавлении ❌');
      }
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Не удалось добавить принтер ❌');
    },
  });

  const deletePrinter = useMutation({
    mutationFn: deletePrinterAction,
    onSuccess: async (res) => {
      if (res.success) {
        queryClient.invalidateQueries({ queryKey: ['printers'] });
        toast.success('Принтер успешно удален! ✅');
      } else {
        toast.error(res.message || 'Ошибка при удалении ❌');
      }
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Не удалось удалить принтер ❌');
    },
  });

  return {
    create,
    deletePrinter,
  };
};
