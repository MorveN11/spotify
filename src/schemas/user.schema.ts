import z from 'zod';

export const userSchema = z.object({
  uid: z.string({
    message: 'El ID del usuario es requerido',
  }),
  displayName: z
    .string({
      message: 'El nombre del usuario es requerido',
    })
    .min(1, {
      message: 'El nombre del usuario no puede estar vacío',
    }),
  email: z
    .string({
      message: 'El email del usuario es requerido',
    })
    .email({
      message: 'El email debe ser un email válido',
    }),
  isAdmin: z.boolean(),
});
