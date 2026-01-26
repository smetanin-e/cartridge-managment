import { prisma } from '@/shared/lib/prisma-client';
import { CartridgeDTO } from '../model/types';
import { RegisterCartridgeFormType } from '@/features/cartridge/model/schemas/register-сartrige-schema';
import { CartridgeStatus } from '@prisma/client';

export const cartridgeRepository = {
  async getCartridges(): Promise<CartridgeDTO[]> {
    return prisma.cartridge.findMany({
      include: {
        model: { select: { model: true, id: true } },
      },
      orderBy: {
        numericLabel: 'desc',
      },
    });
  },

  async findByLabel(label: string) {
    return prisma.cartridge.findFirst({
      where: { label },
    });
  },

  async findById(id: number) {
    return prisma.cartridge.findFirst({
      where: { id },
      include: { serviceBatchEntries: true, replacementInstalled: true, replacementRemoved: true },
    });
  },

  async findByIdWithRelations(id: number) {
    return prisma.cartridge.findFirst({
      where: { id },
      include: { serviceBatchEntries: true, replacementInstalled: true, replacementRemoved: true },
    });
  },

  async getFilterByStatuses(statuses: CartridgeStatus[] | null) {
    return prisma.cartridge.findMany({
      where: statuses && statuses.length > 0 ? { status: { in: statuses } } : {},
      include: { model: true },
      orderBy: { numericLabel: 'desc' },
    });
  },

  async create(formData: RegisterCartridgeFormType) {
    return prisma.cartridge.create({
      data: {
        label: formData.label,
        modelId: formData.modelId,
        numericLabel: parseInt(formData.label.replace(/\D/g, ''), 10),
        status: formData.status,
      },
    });
  },

  async updateStatus(id: number, status: CartridgeStatus) {
    return prisma.cartridge.update({
      where: { id },
      data: {
        status,
      },
    });
  },

  async updateStatusByIds(ids: number[], status: CartridgeStatus) {
    return prisma.cartridge.updateMany({
      where: { id: { in: ids } },
      data: { status },
    });
  },

  async deleteCartridge(id: number) {
    return prisma.cartridge.delete({
      where: { id },
    });
  },
};
