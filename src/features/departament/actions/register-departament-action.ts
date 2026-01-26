'use server';
import { FormDepartamentType } from '@/entities/departament/model/schema/departament-schema';
import { departamentRepository } from '@/entities/departament/repository/departament-repository';

export const registerDepartamentAction = async (formData: FormDepartamentType) => {
  try {
    const departament = await departamentRepository.findByName(formData.name);
    if (departament) {
      return { success: false, message: 'Подразделение с таким именем уже существует в базе' };
    }

    await departamentRepository.create(formData.name);

    return { success: true };
  } catch (error) {
    console.error('[REGISTER_DEPARTAMENT_ACTION] Server error', error);
    return { success: false, message: 'Ошибка регистрации подразделения' };
  }
};
