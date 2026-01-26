'use server';

import { modelRepository } from '@/entities/cartridge-model/repository/model-repository';
import { RegisterModelFormType } from '@/entities/cartridge-model/model/schema/model-schema';

export const registerModelAction = async (formData: RegisterModelFormType) => {
  try {
    const model = await modelRepository.findByName(formData.model);
    if (model) {
      return { success: false, message: 'Такая модель уже существует в базе' };
    }

    await modelRepository.create(formData);

    return { success: true };
  } catch (error) {
    console.error('[REGISTER_MODEL_ACTION] Server error', error);
    return { success: false, message: 'Ошибка создания модели' };
  }
};
