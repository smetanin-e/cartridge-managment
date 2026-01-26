'use server';
import { cartridgeRepository } from '@/entities/cartridge/repository/cartridge-repository';
import { RegisterCartridgeFormType } from '../model/schemas/register-сartrige-schema';

export const registerCartridgeAction = async (formData: RegisterCartridgeFormType) => {
  try {
    const cartridge = await cartridgeRepository.findByLabel(formData.label);
    if (cartridge) {
      return { success: false, message: 'Такой номер уже есть в базе' };
    }

    await cartridgeRepository.create(formData);

    return { success: true };
  } catch (error) {
    console.error('[REGISTER_CARTRIDGE] Server error', error);
    return { success: false, message: 'Ошибка регистрации картриджа' };
  }
};
