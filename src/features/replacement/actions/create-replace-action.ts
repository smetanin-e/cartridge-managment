'use server';
import { cartridgeRepository } from '@/entities/cartridge/repository/cartridge-repository';
import { ReplacementFormType } from '../model/schemas/replacement-schema';
import { CartridgeStatus } from '@prisma/client';
import { replacementRepository } from '@/entities/replacement/repository/replacementRepository';

export const createReplaceAction = async (formData: ReplacementFormType) => {
  try {
    if (!formData.installedCartridge && !formData.removedCartridge) {
      return { success: false, message: 'Не выбраны картриджи для замены' };
    }

    let installedCartridgeLabel: string | null = null;
    let removedCartridgeLabel: string | null = null;

    if (formData.installedCartridge) {
      const installed = await cartridgeRepository.updateStatus(
        formData.installedCartridge,
        CartridgeStatus.WORKING,
      );
      installedCartridgeLabel = installed.label;
    }

    if (formData.removedCartridge) {
      const removed = await cartridgeRepository.updateStatus(
        formData.removedCartridge,
        CartridgeStatus.REFILL,
      );
      removedCartridgeLabel = removed.label;
    }

    const replace = {
      date: formData.date,
      departamentId: formData.departamentId,
      installedCartridgeLabel,
      removedCartridgeLabel,
      responsible: formData.responsible,
    };

    await replacementRepository.createReplace(replace);

    return { success: true };
  } catch (error) {
    console.error('[CREATE_REPLACE_ACTION] Server error', error);
    return { success: false, message: 'Ошибка оформления ' };
  }
};
