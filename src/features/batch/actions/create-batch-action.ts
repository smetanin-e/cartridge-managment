'use server';

import { BatchForService } from '@/entities/batch/model/types';
import { batchRepository } from '@/entities/batch/repository/batch-repository';
import { cartridgeRepository } from '@/entities/cartridge/repository/cartridge-repository';
import { CartridgeStatus } from '@prisma/client';

export const createBatchAction = async (payload: BatchForService) => {
  try {
    if (payload.cartridges.length === 0) {
      return { success: false, message: 'Отсутствуют картриджи для отправки' };
    }
    const serviceBatch = await batchRepository.createBatch(payload);
    if (!serviceBatch) {
      return { success: false, message: 'Ошибка создания партии' };
    }

    await cartridgeRepository.updateStatusByIds(payload.cartridges, CartridgeStatus.SERVICE);
    return { success: true };
  } catch (error) {
    console.error('[CREATE_BATCH] Server error', error);
    return { success: false, message: 'Ошибка. Партия не создана' };
  }
};
