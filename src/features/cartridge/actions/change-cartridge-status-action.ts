'use server';

import { cartridgeRepository } from '@/entities/cartridge/repository/cartridge-repository';
import { CartridgeStatus } from '@prisma/client';

type Params = {
  id: number;
  status: CartridgeStatus;
};

export const changeCartridgeStatusAction = async ({ id, status }: Params) => {
  try {
    const cartridge = await cartridgeRepository.findById(id);
    if (!cartridge) {
      return { success: false, message: 'Картридж не найден' };
    }

    if (cartridge.status === CartridgeStatus.SERVICE) {
      return {
        success: false,
        message:
          'Картридж находится в сервисе на заправке! Изменить статус картриджа можно, оформив возврат из сервиса',
      };
    }

    if (cartridge.status === CartridgeStatus.WORKING) {
      return {
        success: false,
        message:
          'Картридж находится в работе, его статус изменить нельзя! Изменить статус картриджа можно, оформив замену',
      };
    }

    await cartridgeRepository.updateStatus(cartridge.id, status);

    return { success: true };
  } catch (error) {
    console.error('[CHANGE_STATUS_CARTRIDGE] Server error', error);
    return { success: false, message: 'Ошибка изменения статуса' };
  }
};
