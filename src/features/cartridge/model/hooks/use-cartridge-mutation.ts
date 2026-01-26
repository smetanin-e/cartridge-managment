import { useMutation } from '@tanstack/react-query';
import { registerCartridgeAction } from '../../actions/register-cartridge-action';
import { queryClient } from '@/shared/lib/query-client';
import toast from 'react-hot-toast';
import { deleteCartridgeAction } from '../../actions/delete-cartridge-action';
import { changeCartridgeStatusAction } from '../../actions/change-cartridge-status-action';

export const useCartridgesMutations = () => {
  const create = useMutation({
    mutationFn: registerCartridgeAction,
    onSuccess: async (res) => {
      if (res.success) {
        queryClient.invalidateQueries({ queryKey: ['cartridges'] });
        toast.success('Картридж добавлен в реестр! ✅');
      } else {
        toast.error(res.message || 'Ошибка при регистрации картриджа ❌');
      }
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : 'Не удалось зарегистрировать картридж ❌',
      );
    },
  });

  const deleteCartridge = useMutation({
    mutationFn: deleteCartridgeAction,
    onSuccess: async (res) => {
      if (res.success) {
        queryClient.invalidateQueries({ queryKey: ['cartridges'] });
        toast.success('Картридж удален! ✅');
      } else {
        toast.error(res.message || 'Ошибка при удалении картриджа ❌');
      }
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Не удалось удалить картридж ❌');
    },
  });

  const updateStatus = useMutation({
    mutationFn: changeCartridgeStatusAction,
    onSuccess: async (res) => {
      if (res.success) {
        queryClient.invalidateQueries({ queryKey: ['cartridges'] });
        toast.success('Статус изменен! ✅');
      } else {
        toast.error(res.message || 'Ошибка при изменении статуса картриджа ❌');
      }
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : 'Не удалось изменить статус картриджа ❌',
      );
    },
  });

  return {
    create,
    deleteCartridge,
    updateStatus: {
      mutateAsync: updateStatus.mutateAsync,
      isLoading: updateStatus.isPending,
    },
  };
};
