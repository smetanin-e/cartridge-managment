'use server';

import { userRepository } from '@/entities/user/repository/user-repository';
import { getUserSession } from '@/features/auth/actions/get-user-session';
import { UserRole } from '@prisma/client';

export const toggleUserStatusAction = async (userId: number) => {
  try {
    const admin = await getUserSession();
    if (!admin || !admin.status || admin.role !== UserRole.ADMIN) {
      return { success: false, message: 'У вас нет прав на создание пользователя' };
    }

    const user = await userRepository.findUserById(userId);
    if (!user) {
      return { success: false, message: 'Пользователь не найден' };
    }

    if (admin.id === user.id) {
      return { success: false, message: 'Нельзя изменить статус текущего пользователя' };
    }

    await userRepository.toggleUserStatus(user.id);

    return { success: true };
  } catch (error) {
    console.error('[TOGGLE_USER_STATUS] Server error', error);
    return { success: false, message: 'Ошибка изменения статуса пользователя' };
  }
};
