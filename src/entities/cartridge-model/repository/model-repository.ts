import { prisma } from '@/shared/lib/prisma-client';
import { RegisterModelFormType } from '../model/schema/model-schema';

export const modelRepository = {
  async getModels() {
    return prisma.model.findMany();
  },

  async findByName(name: string) {
    return prisma.model.findUnique({
      where: { model: name },
    });
  },

  async create(formData: RegisterModelFormType) {
    return prisma.model.create({
      data: { model: formData.model },
    });
  },
};
