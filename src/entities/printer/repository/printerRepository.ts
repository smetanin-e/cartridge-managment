import { prisma } from '@/shared/lib/prisma-client';
import { CreatePrinterDTO, PrinterDTO } from '../model/types';

export const printerRepository = {
  async getPrinters(): Promise<PrinterDTO[]> {
    return prisma.printer.findMany({
      include: { models: true },
    });
  },

  async findByName(name: string) {
    return prisma.printer.findFirst({
      where: { name },
    });
  },

  async findById(id: number) {
    return prisma.printer.findFirst({
      where: { id },
    });
  },

  async registerPrinter(formData: CreatePrinterDTO) {
    return prisma.printer.create({
      data: {
        name: formData.name,
        models: {
          connect: formData.models,
        },
      },
    });
  },

  async deleteById(id: number) {
    return prisma.printer.delete({
      where: { id },
    });
  },
};
