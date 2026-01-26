import { prisma } from '@/shared/lib/prisma-client';
import { Replace } from '../model/types';

export const replacementRepository = {
  async findById(replacementId: number) {
    return prisma.replacement.findFirst({ where: { id: replacementId } });
  },

  async usedAfter(replacementId: number, installed: string, removed: string, createdAt: Date) {
    return prisma.replacement.findFirst({
      where: {
        id: { not: replacementId },
        AND: [
          {
            createdAt: { gt: createdAt },
            OR: [
              { installedCartridgeLabel: installed || removed },
              { removedCartridgeLabel: installed || removed },
            ],
          },
        ],
      },
    });
  },

  async getFilteredRemlacements(search: string, take?: number, skip?: number) {
    return prisma.replacement.findMany({
      where: search
        ? {
            OR: [
              { installedCartridgeLabel: { contains: search, mode: 'insensitive' } },
              { removedCartridgeLabel: { contains: search, mode: 'insensitive' } },
              { departament: { name: { contains: search, mode: 'insensitive' } } },
            ],
          }
        : {},
      include: {
        departament: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take,
    });
  },

  async createReplace(data: Replace) {
    return prisma.replacement.create({
      data: {
        date: data.date,
        departamentId: data.departamentId,
        installedCartridgeLabel: data.installedCartridgeLabel,
        removedCartridgeLabel: data.removedCartridgeLabel,
        responsible: data.responsible,
      },
    });
  },

  async deleteById(replacementId: number) {
    return prisma.replacement.delete({ where: { id: replacementId } });
  },
};
