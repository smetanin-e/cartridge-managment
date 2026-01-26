'use server';

import { batchCartridgeRepository } from '@/entities/batch-cartridge/repository/batch-cartridge-repository';
import { ReturnCartriges } from '@/entities/batch/model/types';
import { batchRepository } from '@/entities/batch/repository/batch-repository';
import { cartridgeRepository } from '@/entities/cartridge/repository/cartridge-repository';
import { BatchStatus, CartridgeStatus } from '@prisma/client';

export const returnCartridgesAction = async (data: ReturnCartriges) => {
  try {
    const batch = await batchRepository.findById(data.batchId);
    if (!batch || batch.cartridgesInBatch.length === 0) {
      return { success: false, message: 'Партия не найдена' };
    }

    await batchCartridgeRepository.updateMany(data);

    await cartridgeRepository.updateStatusByIds(data.cartridges, CartridgeStatus.AVAILABLE);

    const cartridgesInBatch = await batchCartridgeRepository.findMany(data.batchId);
    if (!cartridgesInBatch) {
      return { success: false, message: 'Картриджи для возврата не найдены' };
    }

    const allReturned = cartridgesInBatch.every((c) => c.returned);

    const newStatus = allReturned ? BatchStatus.COMPLETED : BatchStatus.PARTIAL_RETURN;

    await batchRepository.update(batch.id, newStatus, data.date);

    return { success: true };
  } catch (error) {
    console.error('[RETURN_CARTRIDGES] Server error', error);
    return { success: false, message: 'Ошибка возврата картриджей' };
  }
};
