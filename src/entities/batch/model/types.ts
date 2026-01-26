import { BatchCartridge } from '@/entities/cartridge/model/types';
import { BatchFormType } from '@/features/batch/model/schemas/batch-form-schema';
import { BatchStatus } from '@prisma/client';

export type BatchForService = BatchFormType & { cartridges: number[] };
export type BatchDTO = {
  id: string;
  date: string;
  responsible: string;
  notes: string;
  status: BatchStatus;
  partialReturnDate: string | null;
  cartridges: BatchCartridge[];
};

export type ReturnCartriges = {
  batchId: string;
  date: string;
  responsible: string;
  notes: string | null;
  cartridges: number[];
};
