import z from 'zod';
import { createUserSchema } from './create-user-schema';

export const resetPasswordSchema = createUserSchema
  .pick({
    password: true,
    confirmPassword: true,
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    {
      message: 'Пароли не совпадают',
      path: ['confirmPassword'],
    },
  );

export type ResetPasswordType = z.infer<typeof resetPasswordSchema>;
