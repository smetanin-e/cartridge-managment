'use server';

import { cartridgeRepository } from '@/entities/cartridge/repository/cartridge-repository';
import { replacementRepository } from '@/entities/replacement/repository/replacementRepository';
import { CartridgeStatus } from '@prisma/client';

export const cancelReplacementAction = async (replacementId: number) => {
  try {
    const replacement = await replacementRepository.findById(replacementId);
    if (!replacement) {
      return { success: false, message: 'Запись замены картриджа не найдена' };
    }

    const { installedCartridgeLabel, removedCartridgeLabel } = replacement;
    const installed = installedCartridgeLabel ? installedCartridgeLabel : 'not installed';
    const removed = removedCartridgeLabel ? removedCartridgeLabel : 'not installed';

    const usedAfter = await replacementRepository.usedAfter(
      replacement.id,
      installed,
      removed,
      replacement.createdAt,
    );
    if (usedAfter) {
      return { success: false, message: 'Невозможно удалить запись' };
    }

    const removedCartridge = await cartridgeRepository.findByLabel(removed);
    if (removedCartridge) {
      if (removedCartridge.status === CartridgeStatus.REFILL) {
        await cartridgeRepository.updateStatus(removedCartridge.id, CartridgeStatus.WORKING);
      } else {
        return { success: false, message: 'Невозможно удалить запись' };
      }
    }

    const installedCartridge = await cartridgeRepository.findByLabel(installed);
    if (installedCartridge) {
      if (installedCartridge.status === CartridgeStatus.WORKING) {
        await cartridgeRepository.updateStatus(installedCartridge.id, CartridgeStatus.AVAILABLE);
      } else {
        return { success: false, message: 'Невозможно удалить запись' };
      }
    }

    await replacementRepository.deleteById(replacement.id);
    return { success: true };
  } catch (error) {
    console.error('[CANCEL_REPLACEMENT_ACTION] Server error', error);
    return { success: false, message: 'Ошибка отмены записи замены картриджа ' };
  }
};
