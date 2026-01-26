'use server';

import { cartridgeRepository } from '@/entities/cartridge/repository/cartridge-repository';
import { CartridgeStatus } from '@prisma/client';

export const deleteCartridgeAction = async (id: number) => {
  try {
    const cartridge = await cartridgeRepository.findByIdWithRelations(id);
    if (!cartridge) {
      return { success: false, message: 'Картридж не найден' };
    }

    if (
      cartridge.status === CartridgeStatus.WORKING ||
      cartridge.status === CartridgeStatus.SERVICE
    ) {
      return { success: false, message: 'Удаление запрещено' };
    }

    const hasRelations =
      cartridge.replacementInstalled.length > 0 ||
      cartridge.replacementRemoved.length > 0 ||
      cartridge.serviceBatchEntries.length > 0;

    if (hasRelations) {
      return {
        success: false,
        message:
          'Удаление запрещено! Картридж учавствовал в заменах или отправлялся в сервис на заправку',
      };
    }

    await cartridgeRepository.deleteCartridge(cartridge.id);

    return { success: true };
  } catch (error) {
    console.error('[DELETE_CARTRIDGE] Server error', error);
    return { success: false, message: 'Ошибка удаления картриджа' };
  }
};
