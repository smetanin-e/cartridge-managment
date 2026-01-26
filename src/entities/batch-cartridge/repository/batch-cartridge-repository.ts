import { ReturnCartriges } from '@/entities/batch/model/types';
import { prisma } from '@/shared/lib/prisma-client';

export const batchCartridgeRepository = {
  async findMany(batchId: string) {
    return prisma.serviceBatchCartridge.findMany({
      where: { serviceBatchId: batchId },
    });
  },

  async deleteAllByBatchId(batchId: string) {
    return prisma.serviceBatchCartridge.deleteMany({
      where: { serviceBatchId: batchId },
    });
  },

  async updateMany(data: ReturnCartriges) {
    return prisma.serviceBatchCartridge.updateMany({
      where: { cartridgeId: { in: data.cartridges } },
      data: {
        returned: true,
        returnDate: data.date,
        returnResponsible: data.responsible,
        returnNotes: data.notes,
      },
    });
  },
};
