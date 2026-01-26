import { BatchDTO } from '@/entities/batch/model/types';

export const getCartridgeReturnInfo = (batch: BatchDTO, cartridgeId: number) => {
  return batch.cartridges?.find((c) => c.id === cartridgeId);
};
