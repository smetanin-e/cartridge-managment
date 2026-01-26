import z from 'zod';

export const registerModelSchema = z.object({
  model: z.string().min(3, { message: 'Необходимо заполнить модель картриджа' }),
});

export type RegisterModelFormType = z.infer<typeof registerModelSchema>;
