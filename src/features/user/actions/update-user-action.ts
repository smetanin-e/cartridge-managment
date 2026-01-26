'use server';
import { userRepository } from '@/entities/user/repository/user-repository';
import { getUserSession } from '@/features/auth/actions/get-user-session';
import { UserRole } from '@prisma/client';
import { UpdateUserType } from '../model/schemas/update-user-schema';

type Payload = {
  userId: number;
  formData: UpdateUserType;
};

export const updateUserAction = async (data: Payload) => {
  try {
    const admin = await getUserSession();
    if (!admin || !admin.status || admin.role !== UserRole.ADMIN) {
      return { success: false, message: 'У вас нет прав на создание пользователя' };
    }

    const user = await userRepository.findUserById(data.userId);
    if (!user) {
      return { success: false, message: 'Пользователь не найден' };
    }

    if (admin.id === user.id) {
      return { success: false, message: 'Нельзя изменить статус текущего пользователя' };
    }

    await userRepository.updateUser(data.userId, data.formData);
    return { success: true };
  } catch (error) {
    console.error('[UPDATE_USER_STATUS] Server error', error);
    return { success: false, message: 'Ошибка обновления данных пользователя' };
  }
};
