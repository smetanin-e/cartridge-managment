'use server';
import { userRepository } from '@/entities/user/repository/user-repository';
import { getUserSession } from '@/features/auth/actions/get-user-session';
import { UserRole } from '@prisma/client';

export const deleteUserAction = async (userId: number) => {
  try {
    const admin = await getUserSession();
    if (!admin || !admin.status || admin.role !== UserRole.ADMIN) {
      return { success: false, message: 'У вас нет прав на удаление пользователя' };
    }

    const user = await userRepository.findUserById(userId);
    if (!user) {
      return { success: false, message: 'Пользователь не найден' };
    }

    if (admin.id === user.id) {
      return { success: false, message: 'Нельзя удалить текущего пользователя' };
    }

    await userRepository.deleteUser(user.id);

    return { success: true };
  } catch (error) {
    console.error('[DELETE_USER] Server error', error);
    return { success: false, message: 'Ошибка удаления пользователя' };
  }
};
