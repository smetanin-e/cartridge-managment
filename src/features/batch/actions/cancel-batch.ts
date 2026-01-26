'use server';
import { batchCartridgeRepository } from '@/entities/batch-cartridge/repository/batch-cartridge-repository';
import { batchRepository } from '@/entities/batch/repository/batch-repository';
import { cartridgeRepository } from '@/entities/cartridge/repository/cartridge-repository';
import { CartridgeStatus } from '@prisma/client';

export const cancelBatchAction = async (batchId: string) => {
  try {
    const batch = await batchRepository.findById(batchId);
    if (!batch || batch.partialReturnDate) {
      return { success: false, message: 'Ошибка' };
    }

    await batchCartridgeRepository.deleteAllByBatchId(batch.id);
    await batchRepository.deleteBatch(batch.id);

    const cartridgesIds = batch.cartridgesInBatch.map((c) => c.cartridgeId);

    await cartridgeRepository.updateStatusByIds(cartridgesIds, CartridgeStatus.REFILL);

    return { success: true };
  } catch (error) {
    console.error('[CANCEL_BATCH] Server error', error);
    return { success: false, message: 'Ошибка отмены партии' };
  }
};
