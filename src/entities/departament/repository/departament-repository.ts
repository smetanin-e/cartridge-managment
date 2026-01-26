import { prisma } from '@/shared/lib/prisma-client';

export const departamentRepository = {
  async getDepartaments() {
    return prisma.departament.findMany();
  },

  async findByName(name: string) {
    return prisma.departament.findFirst({
      where: { name },
    });
  },

  async create(name: string) {
    return prisma.departament.create({
      data: { name },
    });
  },
};
