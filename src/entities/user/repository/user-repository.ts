import { prisma } from '@/shared/lib/prisma-client';
import { AuthUser } from '../model/types';
import { CreateUserType } from '@/features/user/model/schemas/create-user-schema';
import { generateSalt, hashPassword } from '@/shared/lib/auth/password-utils';
import { UpdateUserType } from '@/features/user/model/schemas/update-user-schema';

export const userRepository = {
  async findUserByLogin(login: string) {
    return prisma.user.findUnique({ where: { login } });
  },

  async findUserById(userId: number): Promise<AuthUser | null> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        login: true,
        role: true,
        surname: true,
        firstName: true,
        lastName: true,
        status: true,
      },
    });

    if (!user) return null;
    return user;
  },

  //для смены пароля
  async findUserByIdWithPassword(userId: number) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        password: true,
        salt: true,
      },
    });

    if (!user) return null;
    return user;
  },

  async updatePassword(userId: number, hashedPassword: string, salt: string) {
    return await prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
        salt,
      },
    });
  },

  async getUsers() {
    return await prisma.user.findMany({
      select: {
        id: true,
        login: true,
        surname: true,
        firstName: true,
        lastName: true,
        role: true,
        status: true,
      },
      orderBy: { surname: 'asc' },
    });
  },

  async createUser(formData: CreateUserType) {
    const salt = generateSalt();
    const hashedPassword = await hashPassword(formData.password, salt);
    return prisma.user.create({
      data: {
        login: formData.login,
        password: hashedPassword,
        salt,
        surname: formData.surname,
        firstName: formData.firstName,
        lastName: formData.lastName,
        role: formData.role,
      },
    });
  },

  async toggleUserStatus(userId: number) {
    const user = await this.findUserById(userId);
    return prisma.user.update({ where: { id: userId }, data: { status: !user?.status } });
  },

  async updateUser(userId: number, data: UpdateUserType) {
    return prisma.user.update({ where: { id: userId }, data });
  },

  async deleteUser(userId: number) {
    return prisma.user.delete({
      where: { id: userId },
    });
  },
};
