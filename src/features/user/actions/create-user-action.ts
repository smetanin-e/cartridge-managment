'use server';
import { getUserSession } from '@/features/auth/actions/get-user-session';
import { UserRole } from '@prisma/client';
import { CreateUserType } from '../model/schemas/create-user-schema';
import { userRepository } from '@/entities/user/repository/user-repository';

export const createUserAction = async (formData: CreateUserType) => {
  try {
    const admin = await getUserSession();
    if (!admin || !admin.status || admin.role !== UserRole.ADMIN) {
      return { success: false, message: 'У вас нет прав на создание пользователя' };
    }

    const findUser = await userRepository.findUserByLogin(formData.login);
    if (findUser) {
      return { success: false, message: 'Пользователь с таким логином уже существует' };
    }

    await userRepository.createUser(formData);

    return { success: true };
  } catch (error) {
    console.error('[CREATE_USER] Server error', error);
    return { success: false, message: 'Ошибка регистрации пользователя' };
  }
};
